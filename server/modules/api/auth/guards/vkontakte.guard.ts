import * as Nest from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import * as Constants from '../shared/auth.constants';
import * as Interfaces from '../shared/auth.interfaces';

@Nest.Injectable()
export class VkontakteGuard extends AuthGuard('vkontakte') {
  constructor (
    @Nest.Inject(Constants.DI.Config.Vkontakte)
      private readonly config: Interfaces.Config.Vkontakte,
  ) {
    super({ scope: config.scope });
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
