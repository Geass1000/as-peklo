import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import * as Constants from '../../shared/constants';

import * as Shared from '../../../../shared';

import { AuthService } from './../../core/auth/auth.service';

interface DelegateEvent {
  type: string;
  id: string;
}

@Component({
  selector: 'app-profile-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @select([ 'profile', 'socials' ])
    socials$!: Observable<Shared.Interfaces.User.Social[]>;

  constructor(
    private authService: AuthService,
  ) { }

  public ngOnInit () {
  }

  public getIcon (provider: Shared.Enums.User.SocialProvider) {
    const infoSocial = _.find(Constants.User.Socials, [ 'provider', provider ]);
    return infoSocial ? infoSocial.icon : '';
  }

  public onClick (event: any) {
    switch (event.type) {
      case 'add':
        this.onClickAdd(event.id);
        return;
      case 'change':
        this.onClickChange(event.id);
        return;
    }
  }

  public onClickAdd (provider: string) {
    this.authService.getRedirectURL(provider, { state: '/profile' })
      .subscribe(() => {});
  }

  public onClickChange (provider: string) {
  }
}
