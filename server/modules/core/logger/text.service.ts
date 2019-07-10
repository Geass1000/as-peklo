import * as Nest from '@nestjs/common';

import * as _ from 'lodash';

import { Interfaces, Constants, Enums } from './shared';
import { OptionService } from './option.service';

@Nest.Injectable({})
export class TextService {
  private stylesAreDisabled: boolean;

  constructor (
    private optionService: OptionService,
  ) {
    this.stylesAreDisabled = this.optionService.getFromOptions('styles.disabled');
  }

  public calculateStyle (
    logLevel: Enums.LogLevel,
    fieldName: string,
  ): string {
    if (this.stylesAreDisabled) {
      return '';
    }
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
    if (this.stylesAreDisabled) {
      return text;
    }
    return `${textStyle}${text}${Enums.TextEffect.Reset}${parentStyle}`;
  }
}
