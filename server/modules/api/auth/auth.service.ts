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

  public createToken (user: User.Interfaces.UserDocument): Interfaces.AccessToken.Type {
  public getFacebookRedirect (): Interfaces.RedirectOptions {
    const queryParams: string[] = [
      `client_id=${this.facebookConfig.clientId}`,
      `redirect_uri=${this.facebookConfig.oauthRedirectURL}`,
      `state=${this.facebookConfig.state}`,
    ];
    return this.getRedirect(this.facebookConfig, queryParams);
  }

  public getGoogleRedirect (): Interfaces.RedirectOptions {
    const queryParams: string[] = [
      `client_id=${this.googleConfig.clientId}`,
      `redirect_uri=${this.googleConfig.oauthRedirectURL}`,
      `response_type=${this.googleConfig.responseType}`,
      `scope=${this.googleConfig.scopes.join(' ')}`
    ];
    return this.getRedirect(this.googleConfig, queryParams);
  }

  public getVkontakteRedirect (): Interfaces.RedirectOptions {
    const queryParams: string[] = [
      `client_id=${this.vkontakteConfig.clientId}`,
      `redirect_uri=${this.vkontakteConfig.oauthRedirectURL}`,
      `response_type=${this.vkontakteConfig.responseType}`,
      `scope=${this.vkontakteConfig.scopes.join(' ')}`,
      `v=${this.vkontakteConfig.v}`,
    ];
    return this.getRedirect(this.vkontakteConfig, queryParams);
  }

  public getRedirect<T extends Interfaces.Config.OAuth> (config: T, queryParams: string[]):
      Interfaces.RedirectOptions {
    const redirectURL: string =
      `${config.loginDialogURL}?${queryParams.join('&')}`;

    return {
      url: redirectURL,
    };
  }
}
