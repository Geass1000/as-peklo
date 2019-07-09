import * as Shared from './../../../../../shared';

export function OAuthStrategyHandler (provider: Shared.Enums.User.SocialProvider) {
  return async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    done(null, profile);
  }
};
