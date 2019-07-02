import * as Enums from '../shared/enums';

export namespace Environment {
  export interface NatsOptions {
    url: string;
  }
}

export interface Environment {
  mode: Enums.Environment;
  port: number;
  nats: Environment.NatsOptions;
}
