import { AuthToken } from './../../../core/auth/auth.interfaces';
import { AuthService } from './../../../core/auth/auth.service';
import * as _ from 'lodash';

import { APIController, User } from './../../../decorators';

import { GamesService } from './games.service';
import * as Interfaces from './games.interfaces';
import * as Nest from '@nestjs/common';
import { GamesHelper } from './games.helper';
import * as DTO from './games.dto';

@APIController(1, 'games')
export class GamesController {
  constructor (
    private gamesService: GamesService,
    private authService: AuthService<DTO.SignIn>,
  ) {}

  @Nest.Get()
  async stub() {
  }

  @Nest.Post()
  async signIn (@Nest.Body() signInDto: DTO.SignIn): Promise<AuthToken> {
    const sid = await this.gamesService.signIn({
      uid: signInDto.uid,
      auth_key: signInDto.auth_key,
    });

    const user = new DTO.User(signInDto.uid, signInDto.auth_key, sid);

    return this.authService.signIn(user);
  }

  @Nest.Get()
  async getGameInfo (@User() user: DTO.User): Promise<DTO.GameInfo> {
    const gameInfo = await this.gamesService.getGameInfo(user);

    const resourceItems = GamesHelper.getResourcesItems(gameInfo);
    const armoryItems = GamesHelper.getArmoryItems(gameInfo);

    return new DTO.GameInfo(
      armoryItems, resourceItems,
    );
  }
}
