import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallbackComponent } from './callback.component';
import { SocialCallbackComponent } from './social.component';

const routes: Routes = [
  {
    path: `callback`,
    component: CallbackComponent,
    children: [
      { path: `**`, component: SocialCallbackComponent, },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CallbackRouter { }

export const components = [
  CallbackComponent,
  SocialCallbackComponent,
];
