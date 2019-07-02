import * as Nest from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthToken } from './auth.interfaces';
import { environment } from '../../environments/environment';

@Nest.Injectable()
export class AuthService<T> {
  constructor (
    private readonly jwtService: JwtService,
  ) {}

  signIn (signInDto: T): AuthToken {
    const accessToken = this.jwtService.sign(signInDto.valueOf() as any);
    return {
      expiresIn: environment.auth.signOptions.expiresIn as number,
      accessToken: accessToken,
    };
  }

  async validateUser (signInDto: T): Promise<any> {
    return await Promise.resolve(signInDto);
  }
}
