import { AuthRouter } from './auth.router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AuthRouter,
  ],
  declarations: [
    AuthComponent,
  ],
  providers: [],
})
export class AuthModule { }
