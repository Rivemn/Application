import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookingPageComponent } from './booking-page/booking-page.component';
import { bookingReducer } from '../store/booking/booking.reducer';
import { BookingEffects } from '../store/booking/booking.effects';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { CapacityLabelPipe } from './capacity-label.pipe';

@NgModule({
  declarations: [
    BookingPageComponent,
    BookingConfirmationComponent,
    MyBookingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature('booking', bookingReducer),
    EffectsModule.forFeature([BookingEffects]),
    AsyncPipe,
    CapacityLabelPipe,
  ],
  exports: [BookingPageComponent],
})
export class BookingModule {}
