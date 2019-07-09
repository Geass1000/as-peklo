import { combineReducers } from 'redux';

/* Store Interfaces */
import * as AppStore from './app.store';
import * as ProfileStore from './profile.store';

/* Store Interface */
export interface Interface {
  app: AppStore.Interface;
  profile: ProfileStore.Interface;
}

/* Store Initial State */
export const InitialState: Interface = {
  app: AppStore.InitialState,
  profile: ProfileStore.InitialState,
};

/* Combine State Reducers */
export const Reducer = combineReducers({
  app: AppStore.Reducer,
  profile: ProfileStore.Reducer,
});
