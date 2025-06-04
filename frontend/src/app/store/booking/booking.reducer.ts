// booking.reducer.ts
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
} from './booking.actions';
import { BookingState } from './booking.state';

export const initialState: BookingState = {
  bookings: [],
  selectedBooking: null,
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
  on(createBookingSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(createBookingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

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
  }))
);
