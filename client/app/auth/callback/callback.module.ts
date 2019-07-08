import { NgModule } from '@angular/core';

import { CallbackRouter, components } from './callback.router';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CallbackRouter,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class CallbackModule { }
