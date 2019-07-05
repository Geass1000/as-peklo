import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


export const modules = [
  ReactiveFormsModule,
  MaterialModule,
  FontAwesomeModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [
    CommonModule,
    ...modules,
  ]
})
export class SharedModule {}
