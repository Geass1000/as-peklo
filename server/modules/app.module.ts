import * as Nest from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { APIModule } from './api/api.module';
import { AngularUniversalModule } from './angular-universal/angular-universal.module';

@Nest.Module({
  imports: [
    CoreModule,
    APIModule,
    AngularUniversalModule.forRoot(),
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
