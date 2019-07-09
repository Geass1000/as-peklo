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

export const components = [
  MainComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...modules,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    CommonModule,
    ...modules,
    ...components,
  ],
})
export class SharedModule {}
