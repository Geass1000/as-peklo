import * as Nest from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';

@Nest.Injectable()
export class GoogleGuard extends AuthGuard('google') {
  constructor (
    @Nest.Inject(Constants.DI.Config.Google)
      private readonly googleConfig: Interfaces.Config.Google,
  ) {
    super({ scope: googleConfig.scopes });
  }

  async canActivate (context: Nest.ExecutionContext): Promise<any> {
    try {
      const res = await super.canActivate(context);
      return res;
    } catch (error) {
      return false;
    }
  }
}
