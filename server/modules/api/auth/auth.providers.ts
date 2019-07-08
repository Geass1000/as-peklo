import {
  JWTStrategy,
  GoogleStrategy,
  FacebookStrategy,
} from './strategies';

import {
  GoogleConfig,
  FacebookConfig,
} from './configs';

import * as Constants from './shared/auth.constants';

export const authProviders = [
  JWTStrategy,
  GoogleStrategy,
  FacebookStrategy,
  {
    provide: Constants.DI.Config.Google,
    useValue: GoogleConfig,
  },
  {
    provide: Constants.DI.Config.Facebook,
    useValue: FacebookConfig,
  },
];
