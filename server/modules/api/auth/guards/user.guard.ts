import * as Nest from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import * as _ from 'lodash';

import * as Shared from '../../../../../shared';
import * as Core from '../../../../core';

import { Constants } from '../shared';

@Nest.Injectable()
export class UserGuard implements Nest.CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: Nest.ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: Shared.Enums.Auth.Roles[] =
      this.reflector.get(Constants.ReflectMetadata.Roles, context.getHandler()) || [];

    const request = context.switchToHttp().getRequest();
    const userId: string = _.get(request, 'params.userId');

    const user: Shared.Interfaces.Auth.AccessToken.Data = request.user;

    if (_.isNil(user) || !_.isString(user.userId) || !_.isArray(user.roles)) {
      throw new Core.Exceptions.InternalServerErrorException(`User not assigned to request`);
    }

    if (!_.isString(user.userId)) {
      throw new Core.Exceptions.InternalServerErrorException(`User has no 'User ID' property`);
    }

    if (user.userId === userId) {
      return true;
    }

    if (!_.isArray(user.roles)) {
      throw new Core.Exceptions.InternalServerErrorException(`User has no 'Roles' property`);
    }

    return this.hasRole(user.roles, roles);
  }

  private hasRole (
    userRoles: Shared.Enums.Auth.Roles[],
    roles: Shared.Enums.Auth.Roles[],
  ) {
    return userRoles.some((role) => roles.includes(role));
  }
}
