import { createAction, props } from '@ngrx/store';
import { Booking } from '../../contracts/Booking';
import { BookingRequest } from '../../contracts/BookingRequest';
import { Workspace } from '../../contracts/Workspace';
import { Availability } from '../../contracts/Availability';

export const loadBookings = createAction('[Booking] Load Bookings');
export const loadBookingsSuccess = createAction(
  '[Booking] Load Bookings Success',
  props<{ bookings: Booking[] }>()
);
export const loadBookingsFailure = createAction(
  '[Booking] Load Bookings Failure',
  props<{ error: string }>()
);

export const loadBookingById = createAction(
  '[Booking] Load Booking By Id',
  props<{ id: string }>()
);
export const loadBookingByIdSuccess = createAction(
  '[Booking] Load Booking By Id Success',
  props<{ booking: Booking }>()
);
export const loadBookingByIdFailure = createAction(
  '[Booking] Load Booking By Id Failure',
  props<{ error: string }>()
);

export const loadBookingsByUser = createAction(
  '[Booking] Load Bookings By User',
  props<{ userId: string }>()
);
export const loadBookingsByUserSuccess = createAction(
  '[Booking] Load Bookings By User Success',
  props<{ bookings: Booking[] }>()
);
export const loadBookingsByUserFailure = createAction(
  '[Booking] Load Bookings By User Failure',
  props<{ error: string }>()
);

export const createBooking = createAction(
  '[Booking] Create Booking',
  props<{ request: BookingRequest }>()
);
export const createBookingSuccess = createAction(
  '[Booking] Create Booking Success',
  props<{ bookingId: string }>()
);
export const createBookingFailure = createAction(
  '[Booking] Create Booking Failure',
  props<{ error: string }>()
);
export const loadBookingsByUserEmail = createAction(
  '[Booking] Load Bookings By User Email',
  props<{ email: string }>()
);

export const loadBookingsByUserEmailSuccess = createAction(
  '[Booking] Load Bookings By User Email Success',
  props<{ bookings: Booking[] }>()
);

export const loadBookingsByUserEmailFailure = createAction(
  '[Booking] Load Bookings By User Email Failure',
  props<{ error: string }>()
);

export const deleteBooking = createAction(
  '[Booking] Delete Booking',
  props<{ id: string }>()
);
export const deleteBookingSuccess = createAction(
  '[Booking] Delete Booking Success',
  props<{ id: string }>()
);
export const deleteBookingFailure = createAction(
  '[Booking] Delete Booking Failure',
  props<{ error: string }>()
);

export const loadWorkspaces = createAction('[Booking] Load Workspaces');
export const loadWorkspacesSuccess = createAction(
  '[Booking] Load Workspaces Success',
  props<{ workspaces: Workspace[] }>()
);
export const loadWorkspacesFailure = createAction(
  '[Booking] Load Workspaces Failure',
  props<{ error: string }>()
);

export const loadAvailabilitiesByWorkspace = createAction(
  '[Booking] Load Availabilities By Workspace',
  props<{ workspaceId: string }>()
);
export const loadAvailabilitiesByWorkspaceSuccess = createAction(
  '[Booking] Load Availabilities By Workspace Success',
  props<{ availabilities: Availability[] }>()
);
export const loadAvailabilitiesByWorkspaceFailure = createAction(
  '[Booking] Load Availabilities By Workspace Failure',
  props<{ error: string }>()
);
