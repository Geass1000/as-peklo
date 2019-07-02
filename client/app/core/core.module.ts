import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    HttpClientModule,
    AuthModule,
  ],
})
export class CoreModule {}
