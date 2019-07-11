import { Document } from 'mongoose';

import * as Gafrome from 'gafrome-core';

export namespace User {
  export interface SocialPart {
    google?: Gafrome.Shared.Interfaces.User.SocialCreds;
    facebook?: Gafrome.Shared.Interfaces.User.SocialCreds;
    vkontakte?: Gafrome.Shared.Interfaces.User.SocialCreds;
    [key: string]: any;
  }
}

export interface User extends User.SocialPart {
  roles: [ String ];
}

export interface UserDocument extends User, Document {
}

