import { Reducer as ReduxReducer } from 'redux';
import * as Interfaces from '../core/redux.interfaces';

import * as AppEvents from '../events/app.events';

export interface Interface {
}

export const InitialState: Interface = {
};

export const Reducer: ReduxReducer<Interface> = (state = InitialState, action: Interfaces.Action): Interface => {
  switch (action.type) {
    case AppEvents.AppStub: {
      console.log(`Is Event!`);
      return Object.assign({}, state);
    }
  }
  return state;
};
