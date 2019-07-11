import * as Nest from '@nestjs/common';

import * as Constants from './shared/auth.constants';
import * as Interfaces from './shared/auth.interfaces';

import * as Gafrome from 'gafrome-core';

@Nest.Injectable()
export class AuthService {

  constructor (
    @Nest.Inject(Constants.DI.Config.Google)
      private readonly googleConfig: Interfaces.Config.Google,
    @Nest.Inject(Constants.DI.Config.Facebook)
      private readonly facebookConfig: Interfaces.Config.Facebook,
    @Nest.Inject(Constants.DI.Config.Vkontakte)
      private readonly vkontakteConfig: Interfaces.Config.Vkontakte,
  ) {
  }

  public getFacebookRedirect (
    redirectOpts: Gafrome.Shared.Interfaces.Auth.RedirectOptions
  ): string {
    const queryParams: string[] = [];
    return this.getRedirect(this.facebookConfig, queryParams, redirectOpts);
  }

  public getGoogleRedirect (
    redirectOpts: Gafrome.Shared.Interfaces.Auth.RedirectOptions
  ): string {
    const queryParams: string[] = [];
    return this.getRedirect(this.googleConfig, queryParams, redirectOpts);
  }

  public getVkontakteRedirect (
    redirectOpts: Gafrome.Shared.Interfaces.Auth.RedirectOptions
  ): string {
    const queryParams: string[] = [
      `v=${this.vkontakteConfig.v}`,
    ];
    return this.getRedirect(this.vkontakteConfig, queryParams, redirectOpts);
  }

  public getRedirect<T extends Interfaces.Config.OAuth> (
    config: T,
    specificQueryParams: string[],
    redirectOpts: Gafrome.Shared.Interfaces.Auth.RedirectOptions,
  ): string {
    const queryParams = [
      `response_type=code`,
      `state=${redirectOpts.state}`,
      `client_id=${config.clientId}`,
      `redirect_uri=${config.oauthRedirectURL}`,
      `scope=${config.scope.join(' ')}`,
      ...specificQueryParams,
    ];

    const redirectURL: string =
      `${config.loginDialogURL}?${queryParams.join('&')}`;

    return redirectURL;
  }
}
