import { BaseComponent } from './../../shared/base/base.component';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-auth-callback-social',
  template: '',
})
export class SocialCallbackComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) { super(); }

  public ngOnInit() {
    const inBrowser = isPlatformBrowser(this.platformId);

    if (!inBrowser) {
      return;
    }

    this.subscribe = this.route.url.subscribe((socialURL) => {
      const snapshot = this.route.snapshot;
      const params = snapshot.queryParamMap;

      const code = params.get('code');
      const provider = socialURL[0].path;

      this.authService.signIn(provider, code)
        .subscribe(() => {
          this.router.navigate([ `/` ], { replaceUrl: true });
        });
    });
  }
}
