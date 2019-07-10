import * as Nest from '@nestjs/common';

import * as _ from 'lodash';

import { Interfaces, Constants, Enums } from './shared';
import { OptionService } from './option.service';

@Nest.Injectable({})
export class TextService {

  constructor (
    private optionService: OptionService,
  ) {}

  public calculateStyle (
    logLevel: Enums.LogLevel,
    fieldName: string,
  ): string {
    const textColor = this.optionService
      .getFromOptions(`styles[${logLevel}].colors.${fieldName}`) || '';
    const textBg = this.optionService
      .getFromOptions(`styles[${logLevel}].backgrounds.${fieldName}`) || '';
    const textEffect = this.optionService
      .getFromOptions(`styles[${logLevel}].effects.${fieldName}`) || '';
    return `${textColor}${textBg}${textEffect}`;
  }

  public useStyle (
    text: string,
    textStyle: string,
    parentStyle: string = '',
  ): string {
    return `${textStyle}${text}${Enums.TextEffect.Reset}${parentStyle}`;
  }
}
