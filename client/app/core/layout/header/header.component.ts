import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor (
    private authService: AuthService,
  ) {}

  public isLoggedIn () {
    return this.authService.isLoggedIn();
  }
}
