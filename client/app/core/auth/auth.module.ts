import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';

import * as Constants from './auth.constants';

export function tokenGetter() {
  return localStorage.getItem(Constants.LocalStorage.AccessToken);
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    })
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule {}
