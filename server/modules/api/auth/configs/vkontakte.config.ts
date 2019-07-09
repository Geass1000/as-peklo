import { environment } from '../../../../environments/environment';

import * as Interfaces from '../shared/auth.interfaces';

export const VkontakteConfig: Interfaces.Config.Vkontakte = {
  clientId: '7048667',
  clientSecret: process.env.VK_SECRET,
  loginDialogURL: 'https://oauth.vk.com/authorize',
  oauthRedirectURL: `${environment.server.protocol}://${environment.server.domain}:4200/auth/callback/vkontakte`,
  scope: [
    'email',
  ],
  v: '5.101',
};
