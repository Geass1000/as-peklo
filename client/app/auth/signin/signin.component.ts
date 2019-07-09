import { Component } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';

import * as Constants from '../../shared/constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  public socialButtons = Constants.User.Socials;

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
