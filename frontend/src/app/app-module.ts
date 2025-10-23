import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core-module';
import { EventsModule } from './events/events-module';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule, EventsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [App],
})
export class AppModule {}
