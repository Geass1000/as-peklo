import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';

import { ClickDelegateDirective } from './directives/click-delegate.directive';

import { MainComponent } from './components/main/main.component';
import { NopeComponent } from './components/nope/nope.component';


export const modules = [
  ReactiveFormsModule,
  MaterialModule,
  FontAwesomeModule,
];

export const directives = [
  ClickDelegateDirective,
];

export const components = [
  MainComponent,
  NopeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...modules,
  ],
  declarations: [
    ...directives,
    ...components,
  ],
  exports: [
    CommonModule,
    ...modules,
    ...directives,
    ...components,
  ],
})
export class SharedModule {}
