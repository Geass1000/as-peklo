import * as Gafrome from 'gafrome-core';

export function OAuthStrategyHandler (provider: Gafrome.Shared.Enums.User.SocialProvider) {
  return async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
    done(null, profile);
  }
};
