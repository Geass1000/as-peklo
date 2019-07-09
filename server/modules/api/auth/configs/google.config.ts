import { environment } from '../../../../environments/environment';

import * as Interfaces from '../shared/auth.interfaces';

export const GoogleConfig: Interfaces.Config.Google = {
  clientId: '764017121074-1b11hn6le14oh19lvgt0eajch4ig37i4.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET,
  loginDialogURL: 'https://accounts.google.com/o/oauth2/auth',
  oauthRedirectURL: `${environment.server.protocol}://${environment.server.domain}:4200/auth/callback/google`,
  scope: [
    'profile',
    'email',
  ],
};
