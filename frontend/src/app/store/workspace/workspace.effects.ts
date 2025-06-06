// workspace.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadWorkspaces,
  loadWorkspacesSuccess,
  loadWorkspacesFailure,
  loadWorkspaceById,
  loadWorkspaceByIdSuccess,
  loadWorkspaceByIdFailure,
  createWorkspace,
  createWorkspaceSuccess,
  createWorkspaceFailure,
  deleteWorkspace,
  deleteWorkspaceSuccess,
  deleteWorkspaceFailure,
} from './workspace.actions';
import { WorkspaceService } from '../../services/workspace.service';

@Injectable({ providedIn: 'root' })
export class WorkspaceEffects {
  constructor(
    private actions$: Actions,
    private workspaceService: WorkspaceService
  ) {}

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

  loadWorkspaceById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWorkspaceById),
      mergeMap(({ id }) =>
        this.workspaceService.getById(id).pipe(
          map((workspace) => loadWorkspaceByIdSuccess({ workspace })),
          catchError((error) =>
            of(loadWorkspaceByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createWorkspace),
      mergeMap(({ request }) =>
        this.workspaceService.create(request).pipe(
          map((workspaceId) => createWorkspaceSuccess({ workspaceId })),
          catchError((error) =>
            of(createWorkspaceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteWorkspace),
      mergeMap(({ id }) =>
        this.workspaceService.delete(id).pipe(
          map(() => deleteWorkspaceSuccess({ id })),
          catchError((error) =>
            of(deleteWorkspaceFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
