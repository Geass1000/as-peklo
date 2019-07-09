import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

/* Interfaces */
import * as AppEvents from '../events/app.events';
import * as Interfaces from '../core/redux.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppActions {

  @dispatch()
  appStub = (): Interfaces.Action => ({
    type: AppEvents.AppStub,
  })

}
