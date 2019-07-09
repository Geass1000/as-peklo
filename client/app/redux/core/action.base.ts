import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

/* Interfaces */
import * as Interfaces from '../core/redux.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ActionBase {
  protected events!: any;

  @dispatch()
  resetStore = (): Interfaces.Action => ({
    type: this.events.ResetStore,
  })
}
