import * as path from 'path';
import * as Nest from '@nestjs/common';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Interfaces, Constants, Enums } from './shared';
import { OptionService } from './option.service';
import { TextService } from './text.service';

@Nest.Injectable({})
export class MessageService {

  constructor (
    private optionService: OptionService,
    private textService: TextService,
  ) {}

  /**
   * Returns the JSON.
   *
   * @returns string
   */
  public prepareJSON (
    metamessage: Interfaces.Metamessage,
    messages: string[],
  ): string {
    return JSON.stringify({ ...metamessage, messages: messages.join('') });
  }

  /**
   * Returns the metamessage.
   *
   * @returns string
   */
  public prepareMetamessage (
    logLevel: Enums.LogLevel,
    data: Interfaces.Metamessage,
  ): string {
    const format = this.optionService.getFromOptions('formats.metamessage');

    const fileName = data.fileName || `UnknownFileName`;
    const filePath = data.filePath || `UnknownFilePath`;

    const styleMetamessage = this.textService.calculateStyle(logLevel, 'metamessage');

    const styleTimestamp = this.textService.calculateStyle(logLevel, 'timestamp');
    const tbeTimestamp = this.textService.useStyle(data.timestamp, styleTimestamp, styleMetamessage);

    const styleLogLevel = this.textService.calculateStyle(logLevel, 'logLevel');
    const tbeLogLevel = this.textService.useStyle(data.logLevel, styleLogLevel, styleMetamessage);

    const styleClassName = this.textService.calculateStyle(logLevel, 'className');
    const tbeClassName = this.textService.useStyle(data.className, styleClassName, styleMetamessage);

    const styleMethodName = this.textService.calculateStyle(logLevel, 'methodName');
    const tbeMethodName = this.textService.useStyle(data.methodName, styleMethodName, styleMetamessage);

    const styleFileName = this.textService.calculateStyle(logLevel, 'fileName');
    const tbeFileName = this.textService.useStyle(fileName, styleFileName, styleMetamessage);

    const styleFilePath = this.textService.calculateStyle(logLevel, 'filePath');
    const tbeFilePath = this.textService.useStyle(filePath, styleFilePath, styleMetamessage);

    const metamessage: string = _.chain(format)
      .replace(`TIMESTAMP`, tbeTimestamp)
      .replace(`LOG_LEVEL`, tbeLogLevel)
      .replace(`CLASS_NAME`, tbeClassName)
      .replace(`METHOD_NAME`, tbeMethodName)
      .replace(`FILE_NAME`, tbeFileName)
      .replace(`FILE_PATH`, tbeFilePath)
      .value();

    const tbeMetamessage = this.textService.useStyle(metamessage, styleFilePath);

    return tbeMetamessage;
  }

  public prepareMessage (message: any, id: string | number): string {
    try {
      if (_.isString(message)) {
        return message;
      }

      return JSON.stringify(message, null, '  ');
    } catch (error) {
      return `(Message[${id}] could not be parsed with JSON.stringify())`;
    }
  }

  public prepareMessages (logLevel: Enums.LogLevel, messages: any[]): string[] {
    const styleMessage = this.textService.calculateStyle(logLevel, 'message');
    const stylesAreDisabled = this.optionService.getFromOptions('styles.disabled');

    const result = _.map(messages, (message, index) => {
      const preparedMessage = this.prepareMessage(message, index);

      if (stylesAreDisabled) {
        return preparedMessage;
      }

      const tbeMessage = _.chain(preparedMessage)
        .split('\n')
        .map((part) => this.textService.useStyle(part, styleMessage))
        .join('\n')
        .value();
      return tbeMessage;
    });
    return result;
  }
}
