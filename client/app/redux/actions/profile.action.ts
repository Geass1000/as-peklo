import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { ActionBase } from './../core/action.base';

/* Interfaces */
import * as Events from '../events';
import * as Interfaces from '../core/redux.interfaces';

import { User } from '../../../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileAction extends ActionBase {
  protected events = Events.Profile;

  @dispatch()
  setUserId = (userId: string): Interfaces.Action => ({
    type: Events.Profile.SetUserId,
    payload: {
      userId,
    },
  })

  @dispatch()
  setUserSocials = (userSocials: User.Social[]): Interfaces.Action => ({
    type: Events.Profile.SetUserSocials,
    payload: {
      userSocials,
    },
  })

}
