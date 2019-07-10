import { Types } from 'mongoose';
import * as Nest from '@nestjs/common';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

import { APIController } from '../../../decorators/api-controller.decorator';
import { ResultInterceptor } from '../../../core/result.interceptor';
import * as Exceptions from './../../../core/exceptions';
import { JWTGuard } from './../auth/guards/jwt.guard';

import { UserModel } from './user.model';
import { Interfaces } from './shared';
import { socialPartOfUserSchema } from './user.schema';
import { Interfaces } from './shared';
import * as SharedInterfaces from '../../../../shared/interfaces';

@Nest.UseGuards(JWTGuard)
@Nest.UseInterceptors(ResultInterceptor)
@APIController(1, 'user')
export class UserController {

  constructor (private userModel: UserModel) {}

  @Nest.Get(`:id`)
  public async getSocialsByUserId (
    @Nest.Param('id') id: string,
  ): Promise<SharedInterfaces.User.Social[]> {
    if (_.isNil(userId)) {
      // Status: 400
      throw new Exceptions.BadRequestException(`User ID not defined`);
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
            _id: new Types.ObjectId(id),
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
      throw new Exceptions.InternalServerErrorException(`User not found`);
    }

    return _.map(socialNames, (socialName) => {
      return { provider: socialName, creds: aggregateData[socialName], };
    });
  }
}
