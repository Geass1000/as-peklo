import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from './../../shared/base/base.component';
import { ProfileAction } from './../../redux/actions/profile.action';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private profileAction: ProfileAction,
  ) { super(); }

  public ngOnInit() {
    const inBrowser = isPlatformBrowser(this.platformId);

    if (!inBrowser) {
      return;
    }
    const childrenRoute = this.route.children[0];

    this.subscribe = childrenRoute.url.subscribe((socialURL) => {
      const snapshot = childrenRoute.snapshot;
      const params = snapshot.queryParamMap;

      const code = params.get('code');
      const provider = socialURL[0].path;
      const destURL = params.get('state') || '/';

      this.authService.signIn(provider, code)
        .subscribe(() => {
          const tokenData = this.authService.getTokenData();
          this.profileAction.setUserId(tokenData.userId);
          this.router.navigate([ destURL ], { replaceUrl: true });
        });
    });
  }
}
