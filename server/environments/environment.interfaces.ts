import { JwtModuleOptions } from '@nestjs/jwt';

import * as GafromeDatabase from 'gafrome-core/modules/database';
import * as GafromeLogger from 'gafrome-core/modules/logger';

import * as Gafrome from 'gafrome-core';

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

  export interface Database {
    mongodb: GafromeDatabase.Interfaces.DatabaseConifg;
  }

  export interface Logger {
    level: GafromeLogger.Enums.LogLevel;
  }
}

export interface Environment {
  mode: Gafrome.Shared.Enums.Environment.Mode;
  server: Environment.Server;
  nats: Environment.NatsOptions;
  auth: Environment.Auth;
  database: Environment.Database;
  logger: Environment.Logger;
}
