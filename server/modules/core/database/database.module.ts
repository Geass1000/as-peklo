import * as Nest from '@nestjs/common';
import { DatabaseHelper } from './database.helper';

import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';

import { environment } from '../../../environments/environment';

import * as Constants from './shared/database.constants';
import * as Enums from './shared/database.enums';

@Nest.Module({
  providers: [
    DatabaseHelper,
    {
      provide: Constants.DI.Mongoose.Connection,
      useFactory: async (dbHelper: DatabaseHelper) => {
        (mongoose as any).Promise = Bluebird;
        const connectionString = dbHelper
          .getConnectionString(
            Enums.DatabaseType.Mongodb,
            environment.database.mongodb,
          );

        return await mongoose.connect(connectionString, { useNewUrlParser: true });
      },
      inject: [ DatabaseHelper ],
    },
  ],
  exports: [
    Constants.DI.Mongoose.Connection,
  ],
})
export class DatabaseModule {}
