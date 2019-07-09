import {
  Directive, HostListener,
  Output, EventEmitter, Input,
} from '@angular/core';

import * as Interfaces from './../interfaces';

@Directive({
  selector: '[appClickDelegate]'
})
export class ClickDelegateDirective {
  @Output() clickDelegate = new EventEmitter<Interfaces.Directive.DelegateEvent>();
  @Input() tagSelector: string;

  constructor() { }

  @HostListener('click', [ '$event' ]) onMouseLeave(event: MouseEvent) {
    if (!event || !event.target) {
      throw new Error('Event variable does not exist!');
    }

    const btn: Element = (event.target as Element).closest('button');

    if (!btn) {
      return;
    }

    const el: Element = (event.target as Element).closest(this.tagSelector);

    if (!el) {
      throw new Error(`Selector didn't find element by '${this.tagSelector}' selector!`);
    }

    const id: string = el.getAttribute('data-id');
    const type: string = btn.getAttribute('data-type');

    this.clickDelegate.emit({ type, id, event });
  }
}
