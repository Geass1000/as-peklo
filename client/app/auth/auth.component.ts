import { Component } from '@angular/core';

import { AuthService } from './../core/auth/auth.service';

import * as Enums from './shared/auth.enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public socialButtons: any[] = [
    {
      id: Enums.AuthProvider.Google,
      class: 'google',
      icon: 'google-plus-g',
      label: `Google+`,
    },
    {
      id: Enums.AuthProvider.Facebook,
      class: 'facebook',
      icon: 'facebook-f',
      label: `Facebook`,
    },
    {
      id: Enums.AuthProvider.Twitter,
      class: 'twitter',
      icon: 'twitter',
      label: `Twitter`,
    },
    {
      id: Enums.AuthProvider.Vkontakte,
      class: 'vkontakte',
      icon: 'vk',
      label: `Vkontakte`,
    },
  ];

  constructor(
    private authService: AuthService,
  ) {}

  public onClickSignIn(event: any) {
    if (!event || !event.target) {
      throw new Error('Event variable does not exist!');
    }
    const el: Element = (event.target as Element).closest('button');

    if (!el) {
      throw new Error('Element was not selected!');
    }

    const id: string = el.getAttribute('data-id');

    this.singIn(id as Enums.AuthProvider);
  }

  private singIn(providerId: Enums.AuthProvider) {
    let getRedirectURL$: Observable<any>;

    switch (providerId) {
      case Enums.AuthProvider.Google:
        getRedirectURL$ = this.authService.getGoogleRedirectURL();
        break;
      default:
        return;
    }

    getRedirectURL$.subscribe((redirectOpts) => {
      window.location.replace(redirectOpts.url);
    });
  }
}
