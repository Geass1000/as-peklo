import { Component } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';

import * as Constants from '../../shared/constants';
import * as Interfaces from './../../shared/interfaces/';
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

  public onClickSignIn(event: Interfaces.Directive.DelegateEvent) {
    this.authService.getRedirectURL(event.id, '/')
      .subscribe((redirectOpts) => {
        window.location.replace(redirectOpts.result);
      });
  }
}
