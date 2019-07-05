import * as Nest from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { environment } from '../../../environments/environment';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import {
  JWTStrategy,
  GoogleStrategy,
} from './strategies';

import {
  GoogleConfig,
} from './configs';

import * as Constants from './shared/auth.constants';

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
    AuthService,
    JWTStrategy,
    GoogleStrategy,
    {
      provide: Constants.DI.Config.Google,
      useValue: GoogleConfig,
    },
  ],
})
export class AuthModule {}
