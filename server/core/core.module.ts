import * as Nest from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { RequestModule } from './sevices/request/request.module';

const NestCacheModule = Nest.CacheModule.register({
  ttl: 0, max: 0,
});

@Nest.Global()
@Nest.Module({
  imports: [
    NestCacheModule,
    CacheModule,
    RequestModule,
  ],
  exports: [
    NestCacheModule,
    RequestModule,
  ],
})
export class CoreModule {}