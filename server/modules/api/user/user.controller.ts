import * as Nest from '@nestjs/common';

import { Types } from 'mongoose';
import * as _ from 'lodash';

import * as Shared from '../../../../shared';
import * as Core from '../../../core';
import * as Auth from '../auth';

import { socialPartOfUserSchema } from './user.schema';
import { UserModel } from './user.model';
import { Interfaces } from './shared';

@Nest.UseGuards(Auth.Guards.JWTGuard)
@Nest.UseInterceptors(Core.Interceptorrs.ResultInterceptor)
@Core.Decorators.APIController(1, 'user')
export class UserController {

  constructor (private userModel: UserModel) {}

  @Nest.Get(`:userId`)
  @Auth.Decorators.UserGuard()
  public async getSocialsByUserId (
    @Nest.Param('userId') userId: string,
  ): Promise<Shared.Interfaces.User.Social[]> {
    if (_.isNil(userId)) {
      // Status: 400
      throw new Core.Exceptions.BadRequestException(`User ID not defined`);
    }

    // Gets names of social fields
    const socialNames = _.keys(socialPartOfUserSchema);

    // Creates parts of aggregate condition
    const socialConditions = _.map(socialNames, (socialName) => {
      return { [socialName]: { $ifNull: [ `$${socialName}`, null ] } };
    });

    // Creates aggregate condition
    const socialCondition = _.reduce(socialConditions,
      (oldCondition: any, partOfSocialCondition: any) => {
        return { ...oldCondition, ...partOfSocialCondition };
      }, {});

    // Finds User by ID
    const aggregateData = await this.userModel.aggregateOne<Interfaces.User.SocialPart>([
        {
          $match: {
            _id: new Types.ObjectId(userId),
          },
        },
        {
          $project: {
            _id: 0,
            ...socialCondition,
          }
        }
      ]);

    if (_.isUndefined(aggregateData)) {
      // Status: 500
      throw new Core.Exceptions.InternalServerErrorException(`User not found`);
    }

    return _.map(socialNames, (socialName) => {
      return { provider: socialName, creds: aggregateData[socialName], };
    });
  }
}
