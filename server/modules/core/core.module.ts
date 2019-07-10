import * as Nest from '@nestjs/common';

import { LoggerModule } from './logger/logger.module';
import { CacheModule } from './cache/cache.module';
import { RequestModule } from './request/request.module';
import { DatabaseModule } from './database/database.module';

import * as Logger from './logger';
import { environment } from '../../environments/environment';

const NestCacheModule = Nest.CacheModule.register({
  ttl: 0, max: 0,
});

const modules = [
  LoggerModule,
  CacheModule,
  RequestModule,
  DatabaseModule,
];

@Nest.Global()
@Nest.Module({
  imports: [
    ...modules,
  ],
  providers: [
    {
      provide: Logger.Constants.DI.LoggerOptions,
      useValue: {
        ...environment.logger,
      },
    }
  ],
  exports: [
    ...modules,
    Logger.Constants.DI.LoggerOptions,
  ],
})
export class CoreModule {}
