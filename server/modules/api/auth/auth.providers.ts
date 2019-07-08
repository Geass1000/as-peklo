import {
  JWTStrategy,
  GoogleStrategy,
  FacebookStrategy,
  VkontakteStrategy,
} from './strategies';

import {
  GoogleConfig,
  FacebookConfig,
  VkontakteConfig,
} from './configs';

import * as Constants from './shared/auth.constants';

export const authProviders = [
  JWTStrategy,
  GoogleStrategy,
  FacebookStrategy,
  VkontakteStrategy,
  {
    provide: Constants.DI.Config.Google,
    useValue: GoogleConfig,
  },
  {
    provide: Constants.DI.Config.Facebook,
    useValue: FacebookConfig,
  },
  {
    provide: Constants.DI.Config.Vkontakte,
    useValue: VkontakteConfig,
  },
];
