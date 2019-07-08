import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthConstants from '../../auth/shared/auth.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  public canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate([ `/${AuthConstants.Route.Base}/${AuthConstants.Route.SignIn}` ]);
      return false;
    }

    const isExpired = this.authService.isExpired();

    return isExpired
      ? this.authService.refreshToken()
          .pipe(
            map(() => true),
            catchError (() => of(false)),
          )
      : true;
  }
}
