import { Document } from 'mongoose';

export namespace User {
  export interface GoogleCreads {
    id: string;
    email: string;
  }

  export interface FacebookCreads {
    id: string;
    email: string;
  }

  export interface VkontakteCreads {
    id: string;
    email: string;
  }
}

export interface User {
  roles: [ String ];
  google?: User.GoogleCreads;
  facebook?: User.FacebookCreads;
  vkontakte?: User.VkontakteCreads;
}

export interface UserDocument extends User, Document {
}


