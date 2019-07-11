import * as Nest from '@nestjs/common';
import * as _ from 'lodash';

import * as Gafrome from 'gafrome-core';

import * as Guards from '../guards/user.guard';

import { Roles } from './roles.decorator';

export const UserGuard = (roles: Gafrome.Shared.Enums.Auth.Roles[] = []): MethodDecorator => {
  return (target, key, descriptor) => {
    Roles(roles)(target, key, descriptor);
    return Nest.UseGuards(Guards.UserGuard)(target, key as string, descriptor);
  }
}
