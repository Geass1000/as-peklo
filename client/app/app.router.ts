import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';

import * as AuthConstants from './auth/shared/auth.constants';

import { HomeComponent } from './components/home/home.component';

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
    canActivate: [ AuthGuard ],
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
