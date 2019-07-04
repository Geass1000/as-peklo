import * as Enums from '../shared/enums';
import * as Constants from './environment.constants';
import * as Interfaces from './environment.interfaces';

export const environment: Interfaces.Environment = {
  mode: Enums.Environment.Production,
  port: +process.env.PORT || Constants.Environment.Server.Port,
  nats: {
    url: process.env.NATS_URL || Constants.Environment.Nats.Url,
  },
  auth: {
    googleSecret: process.env.GOOGLE_SECRET,
    jwt: {
      secret: process.env.AUTH_SECRET || Constants.Environment.Auth.Secret,
      signOptions: {
        expiresIn: process.env.AUTH_EXPIRES_IN || Constants.Environment.Auth.ExpiresIn,
      },
    },
  },
  database: {
    mongodb: {
      username: process.env.DB_MONGODB_USERNAME || Constants.Environment.Mongodb.Username,
      password: process.env.DB_MONGODB_PASSWORD || Constants.Environment.Mongodb.Password,
      host: process.env.DB_MONGODB_HOST || Constants.Environment.Mongodb.Host,
      port: process.env.DB_MONGODB_PORT || Constants.Environment.Mongodb.Port,
      database: process.env.DB_MONGODB_DATABASE || Constants.Environment.Mongodb.Database,
    },
  },
};
