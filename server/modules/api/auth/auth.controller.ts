import * as Nest from '@nestjs/common';
import * as _ from 'lodash';

import { FacebookGuard } from './guards/facebook.guard';
import { GoogleGuard } from './guards/google.guard';
import { VkontakteGuard } from './guards/vkontakte.guard';

import * as Decorators from '../../../core/decorators';
import { ResultInterceptor } from '../../../core/result.interceptor';

import { TokenService } from './token.service';
import { AuthService } from './auth.service';

import * as Constants from './shared/auth.constants';
import * as Shared from './../../../../shared';

@Nest.UseInterceptors(ResultInterceptor)
@Decorators.APIController(1, 'auth')
export class AuthController {
  constructor (
    private tokenService: TokenService,
    private authService: AuthService,
  ) {}

  /**
   * AUTH
   */

  @Nest.Get(Constants.Routes.Auth.RefreshToken)
  public async refreshToken (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
  ): Promise<Shared.Interfaces.Auth.AccessToken.Type> {
    return this.tokenService.refreshAccessToken(authHeader);
  }

  /**
   * FACEBOOK
   */

  @Nest.Post(Constants.Routes.Facebook.Redirect)
  public facebookRedirectURI (
    @Nest.Body() data: Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    return this.authService.getFacebookRedirect(data);
  }

  @Nest.UseGuards(FacebookGuard)
  @Nest.Get(Constants.Routes.Facebook.SignIn)
  public async facebookSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Decorators.User() profile: any,
  ): Promise<Shared.Interfaces.Auth.AccessToken.Type> {
    return this.tokenService.createAccessToken(
      Shared.Enums.User.SocialProvider.Facebook,
      authHeader,
      profile,
    );
  }

  /**
   * GOOGLE
   */

  @Nest.Post(Constants.Routes.Google.Redirect)
  public googleRedirectURI (
    @Nest.Body() data: Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    return this.authService.getGoogleRedirect(data);
  }

  @Nest.UseGuards(GoogleGuard)
  @Nest.Get(Constants.Routes.Google.SignIn)
  public async googleSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Decorators.User() profile: any,
  ): Promise<Shared.Interfaces.Auth.AccessToken.Type> {
    return this.tokenService.createAccessToken(
      Shared.Enums.User.SocialProvider.Google,
      authHeader,
      profile,
    );
  }

  /**
   * VKONTAKTE
   */

  @Nest.Post(Constants.Routes.Vkontakte.Redirect)
  public vkontakteRedirectURI (
    @Nest.Body() data: Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    return this.authService.getVkontakteRedirect(data);
  }

  @Nest.UseGuards(VkontakteGuard)
  @Nest.Get(Constants.Routes.Vkontakte.SignIn)
  public async vkontakteSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Decorators.User() profile: any,
  ): Promise<Shared.Interfaces.Auth.AccessToken.Type> {
    return this.tokenService.createAccessToken(
      Shared.Enums.User.SocialProvider.Vkontakte,
      authHeader,
      profile,
    );
  }
}
