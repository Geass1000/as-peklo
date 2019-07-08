import { SignInComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignOutComponent } from './signout/signout.component';
import { CallbackComponent } from './callback/callback.component';

import * as Constants from './shared/auth.constants';

const routes: Routes = [
  { path: Constants.Route.SignIn,
    component: AuthComponent,
    children: [
      { path: Constants.Route.SignIn, component: SignInComponent, },
      { path: `signin`, redirectTo: `/${Constants.Route.Base}`, },
      { path: `callback`, component: CallbackComponent, },
      { path: Constants.Route.SignOut, component: SignOutComponent, },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRouter { }

export const components = [
  AuthComponent,
  CallbackComponent,
  SignInComponent,
  SignOutComponent,
];
