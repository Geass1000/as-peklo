import * as Nest from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Nest.Module({
  imports: [
  ],
  controllers: [
    GamesController,
  ],
  providers: [
    GamesService,
  ],
})
export class GamesModule {}
