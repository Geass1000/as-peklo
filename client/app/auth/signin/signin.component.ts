import { Component } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';

import * as Enums from '../shared/auth.enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  public socialButtons: any[] = [
    {
      provider: Enums.AuthProvider.Google,
      class: 'google',
      icon: 'google-plus-g',
      label: `Google+`,
    },
    {
      provider: Enums.AuthProvider.Facebook,
      class: 'facebook',
      icon: 'facebook-f',
      label: `Facebook`,
    },
    {
      provider: Enums.AuthProvider.Twitter,
      class: 'twitter',
      icon: 'twitter',
      label: `Twitter`,
    },
    {
      provider: Enums.AuthProvider.Vkontakte,
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

    const provider: string = el.getAttribute('data-id');

    this.authService.getRedirectURL(provider)
      .subscribe((redirectOpts) => {
        window.location.replace(redirectOpts.url);
      });
  }
}
