import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
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
  providers: [AuthService],
})
export class AuthModule {}
