import * as Nest from '@nestjs/common';

import * as Shared from '../../../../../shared';

import { Constants } from '../shared';

export const Roles = (roles: Shared.Enums.Auth.Roles[] = []) => {
  return Nest.SetMetadata(Constants.ReflectMetadata.Roles, roles);
}
