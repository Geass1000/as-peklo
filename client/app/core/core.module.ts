import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faGooglePlusG, faFacebookF, faVk } from '@fortawesome/free-brands-svg-icons';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';

import { UserService } from './services/user.service';

const providers = [
  UserService,
];

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    AuthModule,
    LayoutModule,
  ],
  providers: [
    ...providers,
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
