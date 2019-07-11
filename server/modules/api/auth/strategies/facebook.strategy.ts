import * as Nest from '@nestjs/common';

import * as User from '../../user';
import { OAuthStrategyHandler } from './oauth-strategy.handler';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';
import * as Gafrome from 'gafrome-core';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Nest.Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userModel: User.UserModel,
    @Nest.Inject(Constants.DI.Config.Facebook)
      private readonly config: Interfaces.Config.Facebook,
  ) {
    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: config.oauthRedirectURL,
      profileFields: [ 'id', 'email' ],
    }, OAuthStrategyHandler(Gafrome.Shared.Enums.User.SocialProvider.Google));
  }
}
