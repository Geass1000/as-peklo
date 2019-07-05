import { DatabaseModule } from './database/database.module';
import * as Nest from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { RequestModule } from './request/request.module';

const NestCacheModule = Nest.CacheModule.register({
  ttl: 0, max: 0,
});

@Nest.Global()
@Nest.Module({
  imports: [
    CacheModule,
    RequestModule,
    DatabaseModule,
  ],
  exports: [
    CacheModule,
    RequestModule,
    DatabaseModule,
  ],
})
export class CoreModule {}
