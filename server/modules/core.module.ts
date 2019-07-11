import * as Nest from '@nestjs/common';

import * as Gafrome from 'gafrome-core';

import { environment } from '../environments/environment';

const NestCacheModule = Nest.CacheModule.register({
  ttl: 0, max: 0,
});

const modules = [
  Gafrome.Modules.Logger.LoggerModule,
  Gafrome.Modules.Cache.CacheModule,
  Gafrome.Modules.Request.RequestModule,
  Gafrome.Modules.Database.DatabaseModule,
];

@Nest.Global()
@Nest.Module({
  imports: [
    ...modules,
  ],
  providers: [
    {
      provide: Gafrome.Modules.Logger.Constants.DI.LoggerOptions,
      useValue: {
        ...environment.logger,
      },
    },
    {
      provide: Gafrome.Modules.Database.Constants.DI.Mongoose.Config,
      useValue: {
        ...environment.database.mongodb,
      },
    },
  ],
  exports: [
    ...modules,
    Gafrome.Modules.Logger.Constants.DI.LoggerOptions,
    Gafrome.Modules.Database.Constants.DI.Mongoose.Config,
  ],
})
export class CoreModule {}
