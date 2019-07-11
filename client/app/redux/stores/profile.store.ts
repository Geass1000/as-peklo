import { Reducer as ReduxReducer } from 'redux';
import * as _ from 'lodash';
import * as Interfaces from '../core/redux.interfaces';

import * as Events from '../events';
import { User } from 'gafrome-core/shared/interfaces';

export interface Interface {
  id: string;
  socials: User.Social[];
}

export const InitialState: Interface = {
  id: null,
  socials: null,
};

export const Reducer: ReduxReducer<Interface> = (state = { ...InitialState, }, action: Interfaces.Action): Interface => {
  switch (action.type) {
    case Events.Profile.SetUserId: {
      const userId = action.payload.userId || null;
      return { ...state, id: userId, };
    }
    case Events.Profile.SetUserSocials: {
      const userSocials = action.payload.userSocials || [];
      return { ...state, socials: userSocials, };
    }
    case Events.Profile.ResetStore: {
      return { ...InitialState, };
    }
  }
  return state;
};
