import { ClickDelegateDirective } from './directives/click-delegate.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './components/main/main.component';


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
