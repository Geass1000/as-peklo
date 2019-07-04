import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';

import * as Constants from './database.constants';
import { environment } from '../../environments/environment';
import { DatabaseHelper } from './database.helper';
import * as Enums from './database.enums';

export const databaseProviders = [
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
];
