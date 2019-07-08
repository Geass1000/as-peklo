import * as User from '../../user';

import * as Enums from '../shared/auth.enums';

export function OAuthStrategyHandler (social: string, userModel: User.UserModel) {
  return async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    const existingUser: User.Interfaces.UserDocument =
      await userModel.get({ [`${social}.id`]: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    try {
      const userEmail = profile.emails.shift().value;
      const newUser = await userModel.addOne({
        roles: [ Enums.Roles.User, ],
        [social]: {
          id: profile.id,
          email: userEmail,
        },
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
};
