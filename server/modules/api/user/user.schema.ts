import { Schema } from 'mongoose';

export const GoogleCredsSchema: Schema = new Schema({
  id: String,
  email: String,
}, { _id: false });

export const FacebookCredsSchema: Schema = new Schema({
  id: String,
  email: String,
}, { _id: false });

export const VkontakteCredsSchema: Schema = new Schema({
  id: String,
  email: String,
}, { _id: false });

export const UserSchema: Schema = new Schema({
  roles: [ String ],
  google: {
    type: GoogleCredsSchema,
  },
  facebook: {
    type: FacebookCredsSchema,
  },
  vkontakte: {
    type: VkontakteCredsSchema,
  },
});
