import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadPhotosByWorkspace,
  loadPhotosByWorkspaceSuccess,
  loadPhotosByWorkspaceFailure,
  addPhoto,
  addPhotoSuccess,
  addPhotoFailure,
  deletePhoto,
  deletePhotoSuccess,
  deletePhotoFailure,
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

  addPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPhoto),
      mergeMap(({ photo }) =>
        this.photoService.addPhoto(photo).pipe(
          map((newPhoto) => addPhotoSuccess({ photo: newPhoto })),
          catchError((error) => of(addPhotoFailure({ error: error.message })))
        )
      )
    )
  );

  deletePhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePhoto),
      mergeMap(({ id }) =>
        this.photoService.deletePhoto(id).pipe(
          map(() => deletePhotoSuccess({ id })),
          catchError((error) =>
            of(deletePhotoFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
