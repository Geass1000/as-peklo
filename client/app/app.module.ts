import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { modules as sharedModules } from './shared/shared.module';
import { AppRouter } from './app.router';

import { AppComponent } from './app.component';
import { components } from './app.router';
import { ReduxModule } from './redux/redux.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'web-api' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    ReduxModule,
    CoreModule,
    ...sharedModules,
    AppRouter,
  ],
  declarations: [
    AppComponent,
    ...components,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
