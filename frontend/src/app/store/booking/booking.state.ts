import { Booking } from '../../contracts/Booking';
import { Workspace } from '../../contracts/Workspace';
import { Availability } from '../../contracts/Availability';

export interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  bookingId: string | null;
  workspaces: Workspace[];
  availabilities: Availability[];
  loading: boolean;
  error: string | null;
}
