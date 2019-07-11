import * as Nest from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import * as Database from '../../core/database';
import { LoggerService } from './../../core/logger';

import { UserSchema } from './user.schema';
import * as Interfaces from './shared/user.interfaces';

@Nest.Injectable()
export class UserModel extends Database.CRUDModel<Interfaces.User, Interfaces.UserDocument>  {
  constructor(
    protected logger: LoggerService,
    @Nest.Inject(Database.Constants.DI.Mongoose.Connection)
      private connection: Connection,
  ) {
    super(logger);
    this.model = connection.model('User', UserSchema);
  }
}
