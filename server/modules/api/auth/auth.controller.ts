import * as Nest from '@nestjs/common';
import * as _ from 'lodash';

import { FacebookGuard } from './guards/facebook.guard';
import { GoogleGuard } from './guards/google.guard';
import { VkontakteGuard } from './guards/vkontakte.guard';

import * as Decorators from '../../../decorators';
import { ResultInterceptor } from '../../../core/result.interceptor';

import { TokenService } from './token.service';
import { AuthService } from './auth.service';

import * as Constants from './shared/auth.constants';
import * as Interfaces from './shared/auth.interfaces';
import * as Shared from './../../../../shared';

@Nest.UseInterceptors(ResultInterceptor)
@Decorators.APIController(1, 'auth')
export class AuthController {
  constructor (
    private tokenService: TokenService,
    private authService: AuthService,
  ) {}

  /**
   * FACEBOOK
   */

  @Nest.Get(Constants.Routes.Facebook.Redirect)
  public facebookRedirectURI (): string {
    return this.authService.getFacebookRedirect();
  }

  @Nest.UseGuards(FacebookGuard)
  @Nest.Get(Constants.Routes.Facebook.SignIn)
  public async facebookSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Decorators.User() profile: any,
  ): Promise<Interfaces.AccessToken.Type> {
    return this.tokenService.createAccessToken(
      Shared.Enums.User.SocialProvider.Facebook,
      authHeader,
      profile,
    );
  }

  /**
   * GOOGLE
   */

  @Nest.Get(Constants.Routes.Google.Redirect)
  public googleRedirectURI (): string {
    return this.authService.getGoogleRedirect();
  }

  @Nest.UseGuards(GoogleGuard)
  @Nest.Get(Constants.Routes.Google.SignIn)
  public async googleSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Decorators.User() profile: any,
  ): Promise<Interfaces.AccessToken.Type> {
    return this.tokenService.createAccessToken(
      Shared.Enums.User.SocialProvider.Google,
      authHeader,
      profile,
    );
  }

  /**
   * VKONTAKTE
   */

  @Nest.Get(Constants.Routes.Vkontakte.Redirect)
  public vkontakteRedirectURI (): string {
    return this.authService.getVkontakteRedirect();
  }

  @Nest.UseGuards(VkontakteGuard)
  @Nest.Get(Constants.Routes.Vkontakte.SignIn)
  public async vkontakteSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Decorators.User() profile: any,
  ): Promise<Interfaces.AccessToken.Type> {
    return this.tokenService.createAccessToken(
      Shared.Enums.User.SocialProvider.Vkontakte,
      authHeader,
      profile,
    );
  }
}
