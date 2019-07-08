import * as Nest from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';

@Nest.Injectable()
export class FacebookGuard extends AuthGuard('facebook') {
  constructor (
    @Nest.Inject(Constants.DI.Config.Facebook)
      private readonly config: Interfaces.Config.Facebook,
  ) {
    super();
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
