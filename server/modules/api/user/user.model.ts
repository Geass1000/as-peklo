import * as Nest from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import * as Bluebird from 'bluebird';

import * as Database from '../../core/database';
import { UserSchema } from './user.schema';
import * as Interfaces from './shared/user.interfaces';

@Nest.Injectable()
export class UserModel extends Database.CRUDModel<Interfaces.User, Interfaces.UserDocument>  {
  constructor(
    @Nest.Inject(Database.Constants.DI.Mongoose.Connection)
      private connection: Connection,
  ) {
    super();
    this.model = connection.model('User', UserSchema);
  }
}
