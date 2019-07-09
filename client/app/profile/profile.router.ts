import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: ``,
        redirectTo: `account`,
      },
      {
        path: `account`,
        component: AccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileRouter { }

export const components = [
  ProfileComponent,
  AccountComponent,
];
