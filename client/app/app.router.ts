import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ``,
    component: HomeComponent,
  },
  {
    path: `auth`,
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
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
