import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/auth/auth.service';
import { ProfileAction } from './redux/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'universal';

  constructor(
    private readonly authService: AuthService,
    private profileAction: ProfileAction,
  ) { }

  public ngOnInit (): void {
    const tokenData = this.authService.getTokenData();

    if (tokenData === null) {
      return;
    }

    this.profileAction.setUserId(tokenData.userId);
  }
}
