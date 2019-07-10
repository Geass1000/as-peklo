import { JwtModuleOptions } from '@nestjs/jwt';
import { LogLevel } from '../modules/core/logger/shared/logger.enums';

import * as Enums from '../shared/enums';

export namespace Environment {
  export interface NatsOptions {
    url: string;
  }

  export interface Server {
    protocol: string;
    domain: string;
    port: number;
  }

  export interface Auth {
    googleSecret: string;
    jwt: JwtModuleOptions;
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

  export interface Logger {
    level: LogLevel;
  }
}

export interface Environment {
  mode: Enums.Environment;
  server: Environment.Server;
  nats: Environment.NatsOptions;
  auth: Environment.Auth;
  database: Environment.Database;
  logger: Environment.Logger;
}
