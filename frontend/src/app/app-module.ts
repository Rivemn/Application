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
import { authReducer } from './store/auth/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthModule } from './auth/auth-module';
import { S } from '@angular/cdk/keycodes';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule, // AuthModule реєструє свій NgRx зріз
    EventsModule,
    StoreModule.forRoot({}), // Ініціалізуємо кореневий store (порожній)
    EffectsModule.forRoot([]), // Ініціалізуємо кореневі ефекти (порожні)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Зберігати останні 25 станів
      logOnly: environment.production, // Вимкнути в продакшені
    }),
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [App],
})
export class AppModule {}
