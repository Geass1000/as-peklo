import { Injectable } from '@angular/core';
import { NgRedux, } from '@angular-redux/store';
import * as _ from 'lodash';

import * as Store from './stores/store';

@Injectable({
  providedIn: 'root',
})
export class ReduxService {
  constructor(
    private ngRedux: NgRedux<Store.Interface>,
  ) {}

  /**
   * Returns state using input path selector.
   *
   * @param  {string[]|string} selector
   * @returns <Data>
   */
  public getState<Data> (selector: string[]|string): Data {
    const selectorPath = this.calculateSelectorPath(selector);
    const reduxStore = this.getStore();

    return _.get(reduxStore, selectorPath);
  }

  /**
   * Returns the current state of application (redux store)
   *
   * @return {RootState}
   */
  public getStore(): Store.Interface {
    return this.ngRedux.getState();
  }

  /**
   * Calculates path to state.
   *
   * @param  {string[]|string} selector
   * @returns string
   */
  private calculateSelectorPath (selector: string[] | string): string {
    const selectorFixed = selector ? selector : '';

    const selectorArray = _.isArray(selectorFixed)
      ? selectorFixed : [selectorFixed];

    const selectorPath = selectorArray.join('.');

    return selectorPath;
  }
}
