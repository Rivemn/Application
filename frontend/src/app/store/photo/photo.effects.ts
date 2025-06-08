import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadPhotosByWorkspace,
  loadPhotosByWorkspaceSuccess,
  loadPhotosByWorkspaceFailure,
  loadPhotosByCoworking,
  loadPhotosByCoworkingFailure,
  loadPhotosByCoworkingSuccess,
} from './photo.actions';
import { PhotoService } from '../../services/photo.service';

@Injectable({ providedIn: 'root' })
export class PhotoEffects {
  constructor(private actions$: Actions, private photoService: PhotoService) {}

  loadPhotosByWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotosByWorkspace),
      mergeMap(({ workspaceId }) =>
        this.photoService.getByWorkspaceId(workspaceId).pipe(
          map((photos) => loadPhotosByWorkspaceSuccess({ photos })),
          catchError((error) =>
            of(loadPhotosByWorkspaceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadPhotosByCoworking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotosByCoworking),
      mergeMap(({ coworkingId }) =>
        this.photoService.getByCoworkingId(coworkingId).pipe(
          map((photos) => loadPhotosByCoworkingSuccess({ photos })),
          catchError((error) =>
            of(loadPhotosByCoworkingFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
