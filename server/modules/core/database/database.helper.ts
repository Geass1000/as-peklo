import * as Nest from '@nestjs/common';
import { Environment } from '../../../environments/environment.interfaces';
import * as Enums from './shared/database.enums';

@Nest.Injectable()
export class DatabaseHelper {
  public getConnectionString (type: Enums.DatabaseType, opts: Environment.DatabaseOpts): string {
    return `${type}://${opts.username}:${opts.password}@${opts.host}:${opts.port}/${opts.database}`;
  }
}
