import * as Nest from '@nestjs/common';

import * as User from '../../user';
import { OAuthStrategyHandler } from './oauth-strategy.handler';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';
import * as Gafrome from 'gafrome-core';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-vkontakte';

@Nest.Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userModel: User.UserModel,
    @Nest.Inject(Constants.DI.Config.Vkontakte)
      private readonly config: Interfaces.Config.Vkontakte,
  ) {
    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: config.oauthRedirectURL,
    }, (accessToken: string, refreshToken: string, params: any, profile: any, verified: Function) => {
      const newProfile = { ...profile, };
      newProfile.emails = [ { value: params.email } ];
      return OAuthStrategyHandler(Gafrome.Shared.Enums.User.SocialProvider.Vkontakte)
        (accessToken, refreshToken, newProfile, verified);
    });
  }
}
