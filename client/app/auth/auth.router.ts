import { CallbackComponent } from './callback/callback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: ``, component: AuthComponent, },
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
