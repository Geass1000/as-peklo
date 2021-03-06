import * as Nest from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { environment } from '../../../../environments/environment';

import { TokenService } from '../token.service';

import * as Gafrome from 'gafrome-core';

@Nest.Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.auth.jwt.secret,
    });
  }

  public async validate (data: Gafrome.Shared.Interfaces.Auth.AccessToken.Data, done: Function) {
    const isValid = await this.tokenService.validateAccessToken(data);

    if (!isValid) {
      return done(new Nest.UnauthorizedException(), null);
    }

    done(null, data);
  }
}
