import { Reducer as ReduxReducer } from 'redux';
import * as _ from 'lodash';
import * as Interfaces from '../core/redux.interfaces';

import * as Events from '../events';

export interface Interface {
  id: string;
  socials: any[];
}

export const InitialState: Interface = {
  id: null,
  socials: [],
};

export const Reducer: ReduxReducer<Interface> = (state = InitialState, action: Interfaces.Action): Interface => {
  switch (action.type) {
    case Events.Profile.SetUserId: {
      const userId = action.payload.userId || null;
      return _.assign({}, state, { id: userId, });
    }
    case Events.Profile.SetUserSocials: {
      const userSocials = action.payload.userSocials || [];
      console.log(userSocials);
      return _.assign({}, state, { socials: userSocials, });
    }
  }
  return state;
};
