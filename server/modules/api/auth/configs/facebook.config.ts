import { environment } from '../../../../environments/environment';

import * as Interfaces from '../shared/auth.interfaces';

export const FacebookConfig: Interfaces.Config.Facebook = {
  clientId: '335081620755856',
  clientSecret:  process.env.FACEBOOK_SECRET,
  loginDialogURL: 'https://www.facebook.com/v2.12/dialog/oauth',
  oauthRedirectURL: `${environment.server.protocol}://${environment.server.domain}:4200/auth/callback`,
  state: '{fbstate}',
};
