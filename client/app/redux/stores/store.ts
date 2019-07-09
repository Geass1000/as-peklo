import { combineReducers } from 'redux';

/* Store Interfaces */
import * as ProfileStore from './profile.store';

/* Store Interface */
export interface Interface {
  profile: ProfileStore.Interface;
}

/* Store Initial State */
export const InitialState: Interface = {
  profile: ProfileStore.InitialState,
};

/* Combine State Reducers */
export const Reducer = combineReducers({
  profile: ProfileStore.Reducer,
});
