import { CallbackModule } from './callback/callback.module';
import { AuthRouter, components } from './auth.router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AuthRouter,
    CallbackModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class AuthModule { }
