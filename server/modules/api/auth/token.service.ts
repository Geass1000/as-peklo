import * as Nest from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as _ from 'lodash';

import * as User from '../user';

import * as Gafrome from 'gafrome-core';

@Nest.Injectable()
export class TokenService {

  constructor (
    private readonly jwtService: JwtService,
    private readonly userModel: User.UserModel,
    private logger: Gafrome.Modules.Logger.LoggerService,
  ) {
    this.logger.className = 'TokenService';
  }

  public async refreshAccessToken (
    authHeader: string,
  ): Promise<Gafrome.Shared.Interfaces.Auth.AccessToken.Type> {
    // Validate token (correct decoding) without expired time
    const tokenData = this.getTokenDataFromAuthHeader(authHeader);
    this.logger.debug(`refreshAccessToken`, `Token Data`, tokenData);

    if (_.isNull(tokenData)) {
      // Status: 400
      const error = new Gafrome.Exceptions.BadRequestException(`Token has invalid format`);
      this.logger.error(`refreshAccessToken`, error);
      throw error;
    }

    // Get user ID from token data
    const userId = tokenData.userId;
    this.logger.debug(`refreshAccessToken`, `User ID`, userId);

    if (_.isNil(userId)) {
      // Status: 422
      const error = new Gafrome.Exceptions.UnprocessableEntityException(`Token has invalid user ID`);
      this.logger.error(`refreshAccessToken`, error);
      throw error;
    }

    // Get user by user ID from Database
    const user = await this.userModel.getById(userId);
    this.logger.debug(`refreshAccessToken`, `User from database`, user);

    if (_.isNil(user)) {
      // Status: 500
      const error = new Gafrome.Exceptions.InternalServerErrorException(`User (${userId}) not found`);
      this.logger.error(`refreshAccessToken`, error);
      throw error;
    }

    // Create new token for user
    return this.createJWTToken(user);
  }

  public async createAccessToken (
    provider: Gafrome.Shared.Enums.User.SocialProvider,
    authHeader: string,
    profile: any,
  ): Promise<Gafrome.Shared.Interfaces.Auth.AccessToken.Type> {
    const tokenData = this.getTokenDataFromAuthHeader(authHeader);
    const userId =  _.get(tokenData, 'userId', null);
    this.logger.debug(`createAccessToken`, `User ID`, userId);

    const user = await this.getUserByOAuthProfile(provider, userId, profile);
    this.logger.debug(`createAccessToken`, `User from database`, user);

    return this.createJWTToken(user);
  }

  public async validateAccessToken (
    token: Gafrome.Shared.Interfaces.Auth.AccessToken.Data,
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
  ): Gafrome.Shared.Interfaces.Auth.AccessToken.Data {
    try {
      // Extracts token from header (Bearer + token)
      const token = _.split(header, ' ')[1];
      // Extracts token data from token
      return this.jwtService.decode(token) as Gafrome.Shared.Interfaces.Auth.AccessToken.Data;
    } catch (error) {
      return null;
    }
  }

  public createJWTToken (
    user: User.Interfaces.UserDocument,
  ): Gafrome.Shared.Interfaces.Auth.AccessToken.Type {
    return this.jwtService.sign({ userId: user._id, roles: user.roles, });
  }

  private async getUserByOAuthProfile (
    social: Gafrome.Shared.Enums.User.SocialProvider,
    userId: string,
    profile: any,
  ): Promise<User.Interfaces.UserDocument> {
    const existingUser: User.Interfaces.UserDocument =
      await this.userModel.get({ [`${social}.id`]: profile.id });

    if (existingUser && !_.isNil(userId) && _.toString(existingUser._id) !== userId) {
      // Status: 500
      const error = new Gafrome.Exceptions.InternalServerErrorException('User is already registred');
      this.logger.error(`getUserByOAuthProfile`, error);
      throw error;
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
      roles: [ Gafrome.Shared.Enums.Auth.Roles.User, ],
      ...newSocialData,
    });
  }
}
