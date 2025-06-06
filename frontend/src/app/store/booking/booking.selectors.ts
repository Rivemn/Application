import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingState } from './booking.state';

export const selectBookingState =
  createFeatureSelector<BookingState>('booking');

export const selectAllBookings = createSelector(
  selectBookingState,
  (state) => state.bookings
);

export const selectSelectedBooking = createSelector(
  selectBookingState,
  (state) => state.selectedBooking
);

export const selectBookingLoading = createSelector(
  selectBookingState,
  (state) => state.loading
);

export const selectBookingError = createSelector(
  selectBookingState,
  (state) => state.error
);

export const selectBookingId = createSelector(
  selectBookingState,
  (state) => state.bookingId
);

export const selectWorkspaces = createSelector(
  selectBookingState,
  (state) => state.workspaces
);

export const selectAvailabilities = createSelector(
  selectBookingState,
  (state) => state.availabilities
);
