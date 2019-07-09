import * as Nest from '@nestjs/common';

import * as User from '../../user';
import { OAuthStrategyHandler } from './oauth-strategy.handler';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';
import * as Shared from './../../../../../shared';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Nest.Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userModel: User.UserModel,
    @Nest.Inject(Constants.DI.Config.Google)
      private readonly config: Interfaces.Config.Google,
  ) {
    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: config.oauthRedirectURL,
    }, OAuthStrategyHandler(Shared.Enums.User.SocialProvider.Google));
  }
}
