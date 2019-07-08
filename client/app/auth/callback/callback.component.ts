import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) { }

  public ngOnInit() {
    const inBrowser = isPlatformBrowser(this.platformId);

    if (!inBrowser) {
      return;
    }

    this.route.queryParamMap.subscribe((params) => {
      let signInResult: Observable<any> = null;

      if (params.has('code') && params.has('state')) {
        const code = params.get('code');
        // Facebook Login
        signInResult = this.authService.facebookSignIn(code);
      } else if (params.has('oauth_token') && params.has('oauth_verifier')) {
        // Twitter Login
      } else if (params.has('code')) {
        const code = params.get('code');
        // Google Login
        signInResult = this.authService.googleSignIn(code);
      }

      if (signInResult === null) {
        return;
      }

      signInResult.subscribe(() => {
        this.router.navigate([ `/` ], { replaceUrl: true });
      });
    });
  }
}
