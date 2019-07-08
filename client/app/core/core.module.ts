import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faGooglePlusG, faFacebookF, faVk } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    AuthModule,
    LayoutModule,
  ],
  exports: [
    LayoutModule,
  ]
})
export class CoreModule {
  constructor() {
    library.add(faTwitter);
    library.add(faGooglePlusG);
    library.add(faFacebookF);
    library.add(faVk);
  }
}
