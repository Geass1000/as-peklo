import { LoggerUtil } from './logger.util';
import * as Nest from '@nestjs/common';

import { Constants } from './shared';

import { DefaultOptions } from './logger.options';
import { LoggerService } from './logger.service';
import { MessageService } from './message.service';
import { OptionService } from './option.service';
import { StyleService } from './style.service';

@Nest.Module({
  providers: [
    LoggerService,
    OptionService,
    MessageService,
    StyleService,
    LoggerUtil,
    {
      provide: Constants.DI.DefaultLoggerOptions,
      useValue: DefaultOptions,
    },
  ],
  exports: [
    LoggerService,
  ],
})
export class LoggerModule {}
