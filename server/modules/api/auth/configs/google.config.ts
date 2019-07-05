import { environment } from '../../../../environments/environment';

import * as Interfaces from '../shared/auth.interfaces';

export const GoogleConfig: Interfaces.Config.Google = {
  clientId: '764017121074-7rnlv0i9t5ju1p7j56k028rkcum4p77t.apps.googleusercontent.com',
  clientSecret: 'ArMYhmM-xBbUfweOp_FVFZzJ',
  loginDialogURL: 'https://accounts.google.com/o/oauth2/auth',
  oauthRedirectURL: `${environment.server.protocol}://${environment.server.domain}:4200/recipes`,
  responseType: 'code',
  scopes: [
    'profile',
    'email',
  ],
};
