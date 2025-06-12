// availability.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  loadAvailabilitiesByWorkspace,
  loadAvailabilitiesByWorkspaceSuccess,
  loadAvailabilitiesByWorkspaceFailure,
  loadAvailabilityById,
  loadAvailabilityByIdSuccess,
  loadAvailabilityByIdFailure,
} from './availability.actions';
import { AvailabilityService } from '../../services/availability.service';

@Injectable({ providedIn: 'root' })
export class AvailabilityEffects {
  constructor(
    private actions$: Actions,
    private availabilityService: AvailabilityService
  ) {}

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
  loadAvailabilityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAvailabilityById),
      switchMap(({ id }) =>
        this.availabilityService.getById(id).pipe(
          map((availability) => loadAvailabilityByIdSuccess({ availability })),
          catchError((error) =>
            of(
              loadAvailabilityByIdFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
