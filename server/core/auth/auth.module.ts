import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';

import { environment } from '../../environments/environment';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(environment.auth),
  ],
  providers: [
    AuthService,
    AuthStrategy,
  ],
  exports: [
    PassportModule,
    AuthService,
  ],
})
export class AuthModule {}
