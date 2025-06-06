// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';

import { bookingReducer } from './store/booking/booking.reducer';
import { BookingEffects } from './store/booking/booking.effects';
import { workspaceReducer } from './store/workspace/workspaces.reducer';
import { WorkspaceEffects } from './store/workspace/workspace.effects';
import { availabilityReducer } from './store/availability/availability.reducer';
import { AvailabilityEffects } from './store/availability/availability.effects';
import { photoReducer } from './store/photo/photo.reducer';
import { PhotoEffects } from './store/photo/photo.effects';
import { amenityReducer } from './store/amenity/amenity.reducer';
import { AmenityEffects } from './store/amenity/amenity.effects';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CoworkingDetailsComponent } from './coworking/coworking-details/coworking-details.component';
import { CoworkingModule } from './coworking/coworking.module';
import { BookingModule } from './booking/booking.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoworkingModule,
    BookingModule,
    AppRoutingModule,
    StoreModule.forRoot({
      bookings: bookingReducer,
      workspaces: workspaceReducer,
      availabilities: availabilityReducer,
      photos: photoReducer,
      amenities: amenityReducer,
    }),
    EffectsModule.forRoot([
      BookingEffects,
      WorkspaceEffects,
      AvailabilityEffects,
      PhotoEffects,
      AmenityEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,

      autoPause: true,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
