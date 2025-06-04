// booking.state.ts

import { Booking } from '../../contracts/Booking';

export interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}
