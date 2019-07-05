import * as Nest from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { environment } from '../../../../environments/environment';

import { AuthService } from '../auth.service';

import * as Interfaces from '../shared/auth.interfaces';

@Nest.Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.auth.jwt.secret,
    });
  }

  public async validate (data: Interfaces.AccessToken.Data, done: Function) {
    const isValid = await this.authService.validateToken(data);

    if (!isValid) {
      return done(new Nest.UnauthorizedException(), null);
    }

    done(null, data);
  }
}
