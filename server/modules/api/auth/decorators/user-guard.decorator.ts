import * as Nest from '@nestjs/common';
import * as _ from 'lodash';

import * as Shared from '../../../../../shared';

import * as Guards from '../guards/user.guard';

import { Roles } from './roles.decorator';

export const UserGuard = (roles: Shared.Enums.Auth.Roles[] = []): MethodDecorator => {
  return (target, key, descriptor) => {
    Roles(roles)(target, key, descriptor);
    return Nest.UseGuards(Guards.UserGuard)(target, key as string, descriptor);
  }
}
