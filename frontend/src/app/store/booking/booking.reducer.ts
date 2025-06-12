import { createReducer, on } from '@ngrx/store';
import {
  loadBookings,
  loadBookingsSuccess,
  loadBookingsFailure,
  loadBookingById,
  loadBookingByIdSuccess,
  loadBookingByIdFailure,
  loadBookingsByUser,
  loadBookingsByUserSuccess,
  loadBookingsByUserFailure,
  createBooking,
  createBookingSuccess,
  createBookingFailure,
  deleteBooking,
  deleteBookingSuccess,
  deleteBookingFailure,
  loadWorkspaces,
  loadWorkspacesSuccess,
  loadWorkspacesFailure,
  loadAvailabilitiesByWorkspace,
  loadAvailabilitiesByWorkspaceSuccess,
  loadAvailabilitiesByWorkspaceFailure,
  loadBookingsByUserEmail,
  loadBookingsByUserEmailSuccess,
  loadBookingsByUserEmailFailure,
  resetBooking,
} from './booking.actions';
import { BookingState } from './booking.state';

export const initialState: BookingState = {
  bookings: [],
  selectedBooking: null,
  bookingId: null,
  workspaces: [],
  availabilities: [],
  loading: false,
  error: null,
};

export const bookingReducer = createReducer(
  initialState,
  on(loadBookings, (state) => ({ ...state, loading: true, error: null })),
  on(loadBookingsSuccess, (state, { bookings }) => ({
    ...state,
    bookings,
    loading: false,

    error: null,
  })),
  on(loadBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadBookingById, (state) => ({ ...state, loading: true, error: null })),
  on(loadBookingByIdSuccess, (state, { booking }) => ({
    ...state,
    selectedBooking: booking,
    loading: false,
    error: null,
  })),
  on(loadBookingByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadBookingsByUser, (state) => ({ ...state, loading: true, error: null })),
  on(loadBookingsByUserSuccess, (state, { bookings }) => ({
    ...state,
    bookings,
    loading: false,
    error: null,
  })),
  on(loadBookingsByUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(createBooking, (state) => ({ ...state, loading: true, error: null })),
  on(createBookingSuccess, (state, { bookingId }) => ({
    ...state,
    bookingId,
    loading: false,
    error: null,
  })),
  on(createBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(resetBooking, () => initialState),

  on(deleteBooking, (state) => ({ ...state, loading: true, error: null })),
  on(deleteBookingSuccess, (state, { id }) => ({
    ...state,
    bookings: state.bookings.filter((booking) => booking.id !== id),
    loading: false,
    error: null,
  })),
  on(deleteBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Обработка новых действий
  on(loadWorkspaces, (state) => ({ ...state, loading: true, error: null })),
  on(loadWorkspacesSuccess, (state, { workspaces }) => ({
    ...state,
    workspaces,
    loading: false,
    error: null,
  })),
  on(loadWorkspacesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadAvailabilitiesByWorkspace, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadAvailabilitiesByWorkspaceSuccess, (state, { availabilities }) => ({
    ...state,
    availabilities,
    loading: false,
    error: null,
  })),
  on(loadAvailabilitiesByWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadBookingsByUserEmail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBookingsByUserEmailSuccess, (state, { bookings }) => ({
    ...state,
    bookings,
    loading: false,
    error: null,
  })),
  on(loadBookingsByUserEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
