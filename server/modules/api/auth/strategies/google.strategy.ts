import * as Nest from '@nestjs/common';

import * as User from '../../user';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';
import * as Enums from '../shared/auth.enums';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Nest.Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userModel: User.UserModel,
    @Nest.Inject(Constants.DI.Config.Google)
      private readonly googleConfig: Interfaces.Config.Google,
  ) {
    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.oauthRedirectURL,
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      const existingUser: User.Interfaces.UserDocument =
        await this.userModel.get({ 'google.id': profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      try {
        const userEmail = profile.emails.shift().value;
        const newUser = await this.userModel.addOne({
          roles: [ Enums.Roles.User, ],
          google: {
            id: profile.id,
            email: userEmail,
          },
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    });
  }
}
