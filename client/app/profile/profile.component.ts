import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/services/user.service';
import { ReduxService } from './../redux/redux.service';
import { ProfileAction } from './../redux/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor (
    private reduxService: ReduxService,
    private userService: UserService,
    private profileAction: ProfileAction,
  ) {}

  public ngOnInit () {
    const userId = this.reduxService.getState<string>([ 'profile', 'id' ]);

    this.userService.getSocialsByUserId(userId)
      .subscribe((userSocials) => {
        this.profileAction.setUserSocials(userSocials.result);
      });
  }
}
