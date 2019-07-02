import * as _ from 'lodash';

import { APIController } from './../../../decorators';
import { GamesService } from './games.service';
import * as Nest from '@nestjs/common';
import { GamesHelper } from './games.helper';

@APIController(1, 'games')
export class GamesController {
  constructor (
    private gamesService: GamesService
  ) {}

  @Nest.Get()
  async signIn() {
  }
}
