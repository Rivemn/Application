import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadAmenitiesByWorkspace,
  loadAmenitiesByWorkspaceSuccess,
  loadAmenitiesByWorkspaceFailure,
} from './amenity.actions';
import { WorkspaceAmenityService } from '../../services/workspaceAmenity.service';

@Injectable({ providedIn: 'root' })
export class AmenityEffects {
  constructor(
    private actions$: Actions,
    private workspaceAmenityService: WorkspaceAmenityService
  ) {}

  loadAmenitiesByWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAmenitiesByWorkspace),
      mergeMap(({ workspaceId }) =>
        this.workspaceAmenityService
          .getAmenitiesByWorkspaceId(workspaceId)
          .pipe(
            map((amenities) =>
              loadAmenitiesByWorkspaceSuccess({ amenities, workspaceId })
            ),
            catchError((error) =>
              of(loadAmenitiesByWorkspaceFailure({ error: error.message }))
            )
          )
      )
    )
  );
}
