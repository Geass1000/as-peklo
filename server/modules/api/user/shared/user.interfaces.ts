import { Document } from 'mongoose';

import * as SharedInterfaces from '../../../../../shared/interfaces';

export namespace User {
  export interface SocialPart {
    google?: SharedInterfaces.User.SocialCreds;
    facebook?: SharedInterfaces.User.SocialCreds;
    vkontakte?: SharedInterfaces.User.SocialCreds;
    [key: string]: any;
  }
}

export interface User extends User.SocialPart {
  roles: [ String ];
}

export interface UserDocument extends User, Document {
}

