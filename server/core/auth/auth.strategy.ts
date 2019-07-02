import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService<any>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.auth.secret,
    });
  }

  async validate (payload: any) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
