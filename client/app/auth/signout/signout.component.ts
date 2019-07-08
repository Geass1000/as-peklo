import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-auth-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignOutComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public ngOnInit() {
    this.authService.signOut()
      .subscribe(() => {
        this.router.navigate([ `/` ], { replaceUrl: true });
      });
  }
}
