import { NgModule } from '@angular/core';
import { ProfileRouter, components } from './profile.router';

import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProfileRouter,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class ProfileModule { }
