import { Document } from 'mongoose';

import * as SharedInterfaces from '../../../../../shared/interfaces';

export interface User {
  roles: [ String ];
  google?: SharedInterfaces.User.SocialCreds;
  facebook?: SharedInterfaces.User.SocialCreds;
  vkontakte?: SharedInterfaces.User.SocialCreds;
}

export interface UserDocument extends User, Document {
}

