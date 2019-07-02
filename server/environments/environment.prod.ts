import * as Enums from '../shared/enums';
import * as Constants from './environment.constants';
import * as Interfaces from './environment.interfaces';

export const environment: Interfaces.Environment = {
  mode: Enums.Environment.Production,
  port: +process.env.PORT || Constants.Environment.Port,
  nats: {
    url: process.env.NATS_URL || Constants.Environment.Nats.Url,
  },
};
