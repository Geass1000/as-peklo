import * as Nest from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { environment } from '../../../environments/environment';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { authProviders } from './auth.providers';
import { TokenService } from './token.service';

@Nest.Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(environment.auth.jwt),
    UserModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    TokenService,
    AuthService,
    ...authProviders,
  ],
})
export class AuthModule {}
