import { combineReducers } from 'redux';

/* Store Interfaces */
import * as AppStore from './app.store';

/* Store Interface */
export interface Interface {
  app: AppStore.Interface;
}

/* Store Initial State */
export const InitialState: Interface = {
  app: AppStore.InitialState
};

/* Combine State Reducers */
export const Reducer = combineReducers({
  app: AppStore.Reducer,
});
