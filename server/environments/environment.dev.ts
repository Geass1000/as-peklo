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
};
