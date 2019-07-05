import { UserDocument } from '../user/shared/user.interfaces';
import { GoogleGuard } from './guards/google.guard';
import * as Nest from '@nestjs/common';

import * as _ from 'lodash';

import * as Decorators from '../../../decorators';

import { AuthService } from './auth.service';

import * as Constants from './shared/auth.constants';
import * as Interfaces from './shared/auth.interfaces';

@Decorators.APIController(1, 'auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @Nest.Get(Constants.Routes.Google.Redirect)
  public async googleRedirectURI (): Promise<any> {
    return this.authService.getGoogleRedirect();
  }

  @Nest.UseGuards(GoogleGuard)
  @Nest.Get(Constants.Routes.Google.SignIn)
  public async googleSignIn (@Decorators.User() user: UserDocument): Promise<Interfaces.SignIn> {
    const accessToken = this.authService.createToken(user);
    return { accessToken: accessToken };
  }
}
