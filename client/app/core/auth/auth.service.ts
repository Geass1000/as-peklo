import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as Constants from './auth.constants';
import * as Interfaces from './auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiV1 = `api/v1`;
  private apiAuth = `${this.apiV1}/auth`;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
  ) {}

  /**
   * Provider logic
   */

  public getRedirectURL (providerName: string): Observable<Interfaces.RedirectOptions> {
    return this.http.get<Interfaces.RedirectOptions>(`${this.apiAuth}/${providerName}/redirect`);
  }

  public signIn (providerName: string, code: string): Observable<Interfaces.SignIn> {
    const req = this.http.get<Interfaces.SignIn>(`${this.apiAuth}/${providerName}/signin?code=${code}`);
    return this.signInHandler(req);
  }

  /**
   * Auth logic
   */

  public signOut (): Observable<unknown> {
    const removeTokenPromise = new Promise((resolve, reject) => {
      try {
        this.deleteToken();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    return from(removeTokenPromise);
  }

  public refreshToken (): Observable<Interfaces.SignIn> {
    const req = this.http.get<Interfaces.SignIn>(`api/v1/auth/refresh`);
    return this.signInHandler(req);
  }

  private signInHandler (req: Observable<Interfaces.SignIn>): Observable<Interfaces.SignIn> {
    return req.pipe(map((data) => {
      this.setToken(data.accessToken);
      return data;
    }));
  }

  /**
   * Token logic
   */

  public setToken (token: Interfaces.AccessToken.Type): void {
    localStorage.setItem(Constants.LocalStorage.AccessToken, token);
  }

  public deleteToken (): void {
    localStorage.removeItem(Constants.LocalStorage.AccessToken);
  }

  public getToken (): Interfaces.AccessToken.Type {
    const accessToken: Interfaces.AccessToken.Type =
      localStorage.getItem(Constants.LocalStorage.AccessToken);
    return accessToken;
  }

  public getTokenData (): Interfaces.AccessToken.Data {
    const accessToken: Interfaces.AccessToken.Type =
      localStorage.getItem(Constants.LocalStorage.AccessToken);

    try {
      return this.jwtHelperService.decodeToken(accessToken);
    } catch (error) {
      return null;
    }
  }

  public isLoggedIn (): boolean {
    const tokenData = this.getTokenData();
    return tokenData !== null;
  }

  public isExpired (): boolean {
    const accessToken: Interfaces.AccessToken.Type =
      localStorage.getItem(Constants.LocalStorage.AccessToken);

    try {
      return this.jwtHelperService.isTokenExpired(accessToken);
    } catch (error) {
      return true;
    }
  }
}
