import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import * as Store from './stores/store';

import { AppActions } from './actions/app.action';

@NgModule({
  imports: [
    SharedModule,
    NgReduxModule,
  ],
  providers: [
    AppActions,
  ],
})
export class ReduxModule {
  constructor(
    ngRedux: NgRedux<Store.Interface>,
    devTools: DevToolsExtension,
  ) {
    let enhancers: any[] = [];

    if (!environment.production && devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer()];
    }

    ngRedux.configureStore(Store.Reducer, Store.InitialState, [], enhancers);
  }
}
