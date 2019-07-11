import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, API } from 'gafrome-core/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiV1 = `api/v1`;
  private apiUser = `${this.apiV1}/user`;

  constructor(
    private http: HttpClient,
  ) {}

  public getSocialsByUserId (id: string): API.RxResult<User.Social[]> {
    return this.http.get<API.Result<User.Social[]>>(`${this.apiUser}/${id}`);
  }
}
