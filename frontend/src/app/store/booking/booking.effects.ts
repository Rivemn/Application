import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { WorkspaceService } from '../../services/workspace.service';
import { AvailabilityService } from '../../services/availability.service';
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
} from './booking.actions';

@Injectable({ providedIn: 'root' })
export class BookingEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private workspaceService: WorkspaceService,
    private availabilityService: AvailabilityService
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
      exhaustMap(({ request }) =>
        this.bookingService.create(request).pipe(
          tap((bookingId) => console.log('Booking created, ID:', bookingId)),
          map((bookingId) => createBookingSuccess({ bookingId })),
          catchError((error) => {
            console.error('Booking error:', error);
            return of(createBookingFailure({ error: error.message }));
          })
        )
      )
    )
  );
  loadBookingsByUserEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookingsByUserEmail),
      mergeMap(({ email }) =>
        this.bookingService.getByUserEmail(email).pipe(
          tap((bookings) => console.log('Fetched bookings:', bookings)),
          map((bookings) => loadBookingsByUserEmailSuccess({ bookings })),
          catchError((error) => {
            console.error('Fetch bookings error:', error);
            return of(loadBookingsByUserEmailFailure({ error: error.message }));
          })
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

  loadWorkspaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWorkspaces),
      mergeMap(() =>
        this.workspaceService.getAll().pipe(
          map((workspaces) => loadWorkspacesSuccess({ workspaces })),
          catchError((error) =>
            of(loadWorkspacesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadAvailabilitiesByWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAvailabilitiesByWorkspace),
      mergeMap(({ workspaceId }) =>
        this.availabilityService.getByWorkspaceId(workspaceId).pipe(
          map((availabilities) =>
            loadAvailabilitiesByWorkspaceSuccess({ availabilities })
          ),
          catchError((error) =>
            of(loadAvailabilitiesByWorkspaceFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
