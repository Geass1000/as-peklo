import * as Enums from '../shared/enums';
import { JwtModuleOptions } from '@nestjs/jwt';

export namespace Environment {
  export interface NatsOptions {
    url: string;
  }

  export interface DatabaseOpts {
    username: string;
    password: string;
    host: string;
    port: string;
    database: string;
  }

  export interface Database {
    mongodb: DatabaseOpts;
  }
}

export interface Environment {
  mode: Enums.Environment;
  port: number;
  nats: Environment.NatsOptions;
  auth: JwtModuleOptions;
  database: Environment.Database;
}
