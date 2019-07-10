import * as Enums from '../shared/enums';
import * as Constants from './environment.constants';
import * as Interfaces from './environment.interfaces';

export const environment: Interfaces.Environment = {
  mode: Enums.Environment.Development,
  server: {
    port: Constants.Environment.Server.Port,
    domain: Constants.Environment.Server.Domain,
    protocol: Constants.Environment.Server.Protocol,
  },
  nats: {
    url: Constants.Environment.Nats.Url,
  },
  auth: {
    googleSecret: process.env.GOOGLE_SECRET,
    jwt: {
      secret: Constants.Environment.Auth.Secret,
      signOptions: {
        expiresIn: Constants.Environment.Auth.ExpiresIn,
      },
    },
  },
  database: {
    mongodb: {
      username: Constants.Environment.Mongodb.Username,
      password: Constants.Environment.Mongodb.Password,
      host: Constants.Environment.Mongodb.Host,
      port: Constants.Environment.Mongodb.Port,
      database: Constants.Environment.Mongodb.Database,
    },
  },
  logger: {
    level: Constants.Environment.Logger.Level,
  },
};
