import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared-module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '../auth/auth-module';

@NgModule({
  declarations: [HeaderComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже импортирован. Импортировать только в AppModule!');
    }
  }
}
