import * as Nest from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';

@Nest.Module({
  imports: [
    AuthModule,
    GamesModule,
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class APIModule {}
