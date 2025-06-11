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
import { workspaceReducer } from '../store/workspace/workspaces.reducer';
import { WorkspaceEffects } from '../store/workspace/workspace.effects';
import { availabilityReducer } from '../store/availability/availability.reducer';
import { AiAssistantComponent } from './my-bookings/ai-assistant/ai-assistant.component';

@NgModule({
  declarations: [
    BookingPageComponent,
    BookingConfirmationComponent,
    MyBookingsComponent,
    AiAssistantComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature('booking', bookingReducer),
    EffectsModule.forFeature([BookingEffects, WorkspaceEffects]),
    AsyncPipe,
    CapacityLabelPipe,
  ],
  exports: [BookingPageComponent],
})
export class BookingModule {}
