import * as Nest from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as _ from 'lodash';

import * as User from '../user';
import * as Shared from './../../../../shared';

import * as Enums from './shared/auth.enums';

@Nest.Injectable()
export class TokenService {

  constructor (
    private readonly jwtService: JwtService,
    private readonly userModel: User.UserModel,
  ) {}

  public async refreshAccessToken (
    authHeader: string,
  ): Promise<Shared.Interfaces.Auth.AccessToken.Type> {
    // Validate token (correct decoding) without expired time
    const tokenData = this.getTokenDataFromAuthHeader(authHeader);

    if (_.isNull(tokenData)) {
      throw new Error(`Token has invalid format!`);
    }

    // Get user ID from token data
    const userId = tokenData.userId;

    if (_.isNil(userId)) {
      throw new Error(`Token has invalid user ID!`);
    }

    // Get user by user ID from Database
    const user = await this.userModel.getById(userId);

    if (_.isNil(user)) {
      throw new Error(`User (${userId} not found)!`);
    }

    // Create new token for user
    return this.createJWTToken(user);
  }

  public async createAccessToken (
    provider: Shared.Enums.User.SocialProvider,
    authHeader: string,
    profile: any,
  ): Promise<Shared.Interfaces.Auth.AccessToken.Type> {
    const tokenData = this.getTokenDataFromAuthHeader(authHeader);
    const userId =  _.get(tokenData, 'userId', null);

    const user = await this.getUserByOAuthProfile(provider, userId, profile);

    return this.createJWTToken(user);
  }

  public async validateAccessToken (
    token: Shared.Interfaces.Auth.AccessToken.Data,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.getById(token.userId);
      return !_.isUndefined(user);
    } catch (error) {
      return false;
    };
  }

  public getTokenDataFromAuthHeader (
    header: string,
  ): Shared.Interfaces.Auth.AccessToken.Data {
    try {
      // Extracts token from header (Bearer + token)
      const token = _.split(header, ' ')[1];
      // Extracts token data from token
      return this.jwtService.decode(token) as Shared.Interfaces.Auth.AccessToken.Data;
    } catch (error) {
      return null;
    }
  }

  public createJWTToken (
    user: User.Interfaces.UserDocument,
  ): Shared.Interfaces.Auth.AccessToken.Type {
    return this.jwtService.sign({ userId: user._id, roles: user.roles, });
  }

  private async getUserByOAuthProfile (
    social: Shared.Enums.User.SocialProvider,
    userId: string,
    profile: any,
  ): Promise<User.Interfaces.UserDocument> {
    const existingUser: User.Interfaces.UserDocument =
      await this.userModel.get({ [`${social}.id`]: profile.id });

    if (existingUser && !_.isNil(userId) && _.toString(existingUser._id) !== userId) {
      throw new Error('User is already registred!');
    }

    if (existingUser) {
      return existingUser;
    }

    const userEmail = _.isArray(profile.emails) && profile.emails.length > 0
      ? profile.emails.shift().value : null;
    const newSocialData = {
      [social]: {
        id: profile.id,
        email: userEmail,
      },
    };

    if (!_.isNil(userId)) {
      return await this.userModel.updateById(userId, newSocialData as any);
    }

    return await this.userModel.addOne({
      roles: [ Enums.Roles.User, ],
      ...newSocialData,
    });
  }
}
