import * as Nest from '@nestjs/common';

import * as Constants from './shared/auth.constants';
import * as Interfaces from './shared/auth.interfaces';

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
    redirectOpts: Interfaces.RedirectOptions
  ): string {
    const queryParams: string[] = [];
    return this.getRedirect(this.facebookConfig, queryParams, redirectOpts);
  }

  public getGoogleRedirect (
    redirectOpts: Interfaces.RedirectOptions
  ): string {
    const queryParams: string[] = [];
    return this.getRedirect(this.googleConfig, queryParams, redirectOpts);
  }

  public getVkontakteRedirect (
    redirectOpts: Interfaces.RedirectOptions
  ): string {
    const queryParams: string[] = [
      `v=${this.vkontakteConfig.v}`,
    ];
    return this.getRedirect(this.vkontakteConfig, queryParams, redirectOpts);
  }

  public getCommonQueryRedirect (
    config: Interfaces.Config.OAuth,
    data: Interfaces.RedirectOptions
  ): string[] {
    return [
      `response_type=code`,
      `state=${data.state}`,
      `client_id=${config.clientId}`,
      `redirect_uri=${config.oauthRedirectURL}`,
      `scope=${config.scope.join(' ')}`,
    ];
  }

  public getRedirect<T extends Interfaces.Config.OAuth> (
    config: T,
    queryParams: string[],
    redirectOpts: Interfaces.RedirectOptions,
  ): string {
    const commonQueryParams = this.getCommonQueryRedirect(config, redirectOpts);

    const redirectURL: string =
      `${config.loginDialogURL}?${[ ...queryParams, ...commonQueryParams ].join('&')}`;

    return redirectURL;
  }
}
