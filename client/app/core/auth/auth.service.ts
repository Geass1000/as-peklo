import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignIn } from './auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn (signInData: SignIn) {
    return this.http.post(`api/v1/games/signin`, signInData);
  }
}
