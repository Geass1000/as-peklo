import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import * as Constants from './auth.constants';
import * as Interfaces from './auth.interfaces';
import { API } from '../../../../shared/interfaces';

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

  public getRedirectURL (providerName: string, destURL: string): API.RxResult<string> {
    return this.http.post<API.Result<string>>(`${this.apiAuth}/${providerName}/redirect`, {
      state: destURL,
    })
      .pipe(
        tap((redirectOpts) => {
          window.location.replace(redirectOpts.result);
        })
      );
  }

  public signIn (providerName: string, code: string): API.RxResult<string> {
    const req = this.http.get<API.Result<string>>(`${this.apiAuth}/${providerName}/signin?code=${code}`);
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

  public refreshToken (): API.RxResult<string> {
    const req = this.http.get<API.Result<string>>(`api/v1/auth/refresh`);
    return this.signInHandler(req);
  }

  private signInHandler (req: API.RxResult<string>): API.RxResult<string> {
    return req.pipe(map((data) => {
      this.setToken(data.result);
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
