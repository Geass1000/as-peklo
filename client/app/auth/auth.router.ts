import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { CallbackComponent } from './callback/callback.component';

import * as Constants from './shared/auth.constants';

const routes: Routes = [
  { path: Constants.Route.SignIn, component: AuthComponent, },
  { path: `callback`, component: CallbackComponent, },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRouter { }

export const components = [
  AuthComponent,
  CallbackComponent,
];
