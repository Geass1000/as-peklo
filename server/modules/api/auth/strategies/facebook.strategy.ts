import { OAuthStrategyHandler } from './oauth-strategy.handler';
import * as Nest from '@nestjs/common';

import * as User from '../../user';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';

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
    }, OAuthStrategyHandler('facebook', userModel));
  }
}
