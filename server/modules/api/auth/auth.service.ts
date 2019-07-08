import * as Nest from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as _ from 'lodash';

import * as User from '../user';

import * as Constants from './shared/auth.constants';
import * as Interfaces from './shared/auth.interfaces';

@Nest.Injectable()
export class AuthService {

  constructor (
    private readonly jwtService: JwtService,
    private readonly userModel: User.UserModel,
    @Nest.Inject(Constants.DI.Config.Google)
      private readonly googleConfig: Interfaces.Config.Google,
  ) {
  }

  public createToken (user: User.Interfaces.UserDocument): Interfaces.AccessToken.Type {
    const accessToken = this.jwtService.sign({ userId: user._id.str });
    return accessToken;
  }

  public async validateToken (token: Interfaces.AccessToken.Data): Promise<boolean> {
    try {
      const user = await this.userModel.getById(token.userId);
      return !_.isUndefined(user);
    } catch (error) {
      return false;
    };
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

  public getRedirect<T extends Interfaces.Config.OAuth> (config: T, queryParams: string[]):
      Interfaces.RedirectOptions {
    const redirectURL: string =
      `${config.loginDialogURL}?${queryParams.join('&')}`;

    return {
      url: redirectURL,
    };
  }
}
