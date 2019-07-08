import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as AuthConstants from './auth/shared/auth.constants';

const routes: Routes = [
  {
    path: ``,
    component: HomeComponent,
  },
  {
    path: AuthConstants.Route.Base,
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouter { }

export const components = [
  HomeComponent,
];
