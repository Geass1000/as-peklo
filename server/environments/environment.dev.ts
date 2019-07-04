import * as Enums from '../shared/enums';
import * as Constants from './environment.constants';
import * as Interfaces from './environment.interfaces';

export const environment: Interfaces.Environment = {
  mode: Enums.Environment.Development,
  port: Constants.Environment.Port,
  nats: {
    url: Constants.Environment.Nats.Url,
  },
  auth: {
    secret: Constants.Environment.Auth.Secret,
    signOptions: {
      expiresIn: Constants.Environment.Auth.ExpiresIn,
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
};
