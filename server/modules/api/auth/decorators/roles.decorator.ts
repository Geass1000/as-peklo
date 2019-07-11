import * as Nest from '@nestjs/common';

import * as Gafrome from 'gafrome-core';

import { Constants } from '../shared';

export const Roles = (roles: Gafrome.Shared.Enums.Auth.Roles[] = []) => {
  return Nest.SetMetadata(Constants.ReflectMetadata.Roles, roles);
}
