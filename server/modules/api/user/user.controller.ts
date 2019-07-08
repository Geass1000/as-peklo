import { DocumentQuery, Types } from 'mongoose';
import * as Nest from '@nestjs/common';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

import { APIController } from '../../../decorators/api-controller.decorator';
import { JWTGuard } from './../auth/guards/jwt.guard';

import { UserModel } from './user.model';
import { Interfaces } from './shared';
import { socialPartOfUserSchema } from './user.schema';

@Nest.UseGuards(JWTGuard)
@APIController(1, 'user')
export class UserController {

  constructor (private userModel: UserModel) {}

  @Nest.Get(`:id`)
  public getById (@Nest.Param('id') id: string) {
    // Gets names of social fields
    const socialNames = _.keys(socialPartOfUserSchema);
    // Creates parts of aggregate condition
    const socialConditions = _.map(socialNames, (name) => {
      return { [name]: { $ifNull: [ `$${name}`, null ] } };
    });
    // Creates aggregate condition
    const socialCondition = _.reduce(socialConditions,
      (oldCondition: any, partOfSocialCondition: any) => {
        return { ...oldCondition, ...partOfSocialCondition };
      }, {});

    // Finds User by ID
    const aggregate = this.userModel.aggregateOne<any>([
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
      ]) as Bluebird<any>;
    return aggregate;
  }
}
