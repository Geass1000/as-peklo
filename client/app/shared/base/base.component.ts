import { OnDestroy } from '@angular/core';
/* RxJS and Redux*/
import { Subscription } from 'rxjs/Subscription';

export class BaseComponent implements OnDestroy {
  public subscription: Set<Subscription> = new Set();

  public ngOnDestroy (): void {
    this.subscription.forEach((data) => data && data.unsubscribe && data.unsubscribe());
    this.subscription.clear();
  }

  public set subscribe (sub: Subscription) {
    this.subscription.add(sub);
  }
}