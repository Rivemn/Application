import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
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
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideStore({
      bookings: bookingReducer,
      workspaces: workspaceReducer,
      availabilities: availabilityReducer,
      photos: photoReducer,
      amenities: amenityReducer,
    }),
    provideEffects(
      BookingEffects,
      WorkspaceEffects,
      AvailabilityEffects,
      PhotoEffects,
      AmenityEffects
    ),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
  ],
};
