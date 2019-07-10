import * as Nest from '@nestjs/common';

import { LoggerModule } from './logger/logger.module';
import { CacheModule } from './cache/cache.module';
import { RequestModule } from './request/request.module';
import { DatabaseModule } from './database/database.module';

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
  exports: [
    ...modules,
  ],
})
export class CoreModule {}
