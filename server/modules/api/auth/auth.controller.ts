import * as Nest from '@nestjs/common';
import * as _ from 'lodash';

import {
  FacebookGuard,
  GoogleGuard,
  VkontakteGuard,
} from './guards';

import * as Gafrome from 'gafrome-core';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

import { Constants } from './shared';

@Nest.UseInterceptors(Gafrome.Interceptors.ResultInterceptor)
@Gafrome.Decorators.APIController(1, 'auth')
export class AuthController {
  constructor (
    private tokenService: TokenService,
    private authService: AuthService,
    private logger: Gafrome.Modules.Logger.LoggerService,
  ) {
    this.logger.className = `AuthController`;
  }

  /**
   * AUTH
   */

  @Nest.Get(Constants.Routes.Auth.RefreshToken)
  public async refreshToken (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
  ): Promise<Gafrome.Shared.Interfaces.Auth.AccessToken.Type> {
    const token = await this.tokenService.refreshAccessToken(authHeader);
    this.logger.info(`refreshToken`, `Generated token -`, token);
    return token;
  }

  /**
   * FACEBOOK
   */

  @Nest.Post(Constants.Routes.Facebook.Redirect)
  public facebookRedirectURI (
    @Nest.Body() data: Gafrome.Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    const redirectLink = this.authService.getFacebookRedirect(data);
    this.logger.info(`facebookRedirectURI`, `Generated link -`, redirectLink);
    return redirectLink;
  }

  @Nest.UseGuards(FacebookGuard)
  @Nest.Get(Constants.Routes.Facebook.SignIn)
  public async facebookSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Gafrome.Decorators.User() profile: any,
  ): Promise<Gafrome.Shared.Interfaces.Auth.AccessToken.Type> {
    const token = await this.tokenService.createAccessToken(
      Gafrome.Shared.Enums.User.SocialProvider.Facebook,
      authHeader,
      profile,
    );
    this.logger.info(`facebookSignIn`, `Generated token -`, token);
    return token;
  }

  /**
   * GOOGLE
   */

  @Nest.Post(Constants.Routes.Google.Redirect)
  public googleRedirectURI (
    @Nest.Body() data: Gafrome.Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    const redirectLink = this.authService.getGoogleRedirect(data);
    this.logger.info(`googleRedirectURI`, `Generated link -`, redirectLink);
    return redirectLink;
  }

  @Nest.UseGuards(GoogleGuard)
  @Nest.Get(Constants.Routes.Google.SignIn)
  public async googleSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Gafrome.Decorators.User() profile: any,
  ): Promise<Gafrome.Shared.Interfaces.Auth.AccessToken.Type> {
    const token = await this.tokenService.createAccessToken(
      Gafrome.Shared.Enums.User.SocialProvider.Google,
      authHeader,
      profile,
    );
    this.logger.info(`googleSignIn`, `Generated token -`, token);
    return token;
  }

  /**
   * VKONTAKTE
   */

  @Nest.Post(Constants.Routes.Vkontakte.Redirect)
  public vkontakteRedirectURI (
    @Nest.Body() data: Gafrome.Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    const redirectLink = this.authService.getVkontakteRedirect(data);
    this.logger.info(`vkontakteRedirectURI`, `Generated link -`, redirectLink);
    return redirectLink;
  }

  @Nest.UseGuards(VkontakteGuard)
  @Nest.Get(Constants.Routes.Vkontakte.SignIn)
  public async vkontakteSignIn (
    @Nest.Headers(Constants.Header.Authorization) authHeader: string,
    @Gafrome.Decorators.User() profile: any,
  ): Promise<Gafrome.Shared.Interfaces.Auth.AccessToken.Type> {
    const token = await this.tokenService.createAccessToken(
      Gafrome.Shared.Enums.User.SocialProvider.Vkontakte,
      authHeader,
      profile,
    );
    this.logger.info(`vkontakteSignIn`, `Generated token -`, token);
    return token;
  }
}
