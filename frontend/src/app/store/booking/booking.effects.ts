import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
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

@Injectable({ providedIn: 'root' })
export class BookingEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}

  loadBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookings),
      mergeMap(() =>
        this.bookingService.getAll().pipe(
          map((bookings) => loadBookingsSuccess({ bookings })),
          catchError((error) =>
            of(loadBookingsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadBookingById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookingById),
      mergeMap(({ id }) =>
        this.bookingService.getById(id).pipe(
          map((booking) => loadBookingByIdSuccess({ booking })),
          catchError((error) =>
            of(loadBookingByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadBookingsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookingsByUser),
      mergeMap(({ userId }) =>
        this.bookingService.getByUser(userId).pipe(
          map((bookings) => loadBookingsByUserSuccess({ bookings })),
          catchError((error) =>
            of(loadBookingsByUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBooking),
      mergeMap(({ request }) =>
        this.bookingService.create(request).pipe(
          map((bookingId) => createBookingSuccess({ bookingId })),
          catchError((error) =>
            of(createBookingFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBooking),
      mergeMap(({ id }) =>
        this.bookingService.delete(id).pipe(
          map(() => deleteBookingSuccess({ id })),
          catchError((error) =>
            of(deleteBookingFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
