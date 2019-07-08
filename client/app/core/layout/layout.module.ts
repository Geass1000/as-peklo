import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
})
export class LayoutModule {}
