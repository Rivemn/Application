import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WorkspaceActions from './workspace.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { WorkspaceService } from '../../services/workspace.service';
import { loadWorkspacesByCoworkingSuccess } from './workspace.actions';

@Injectable()
export class WorkspaceEffects {
  loadWorkspacesByCoworking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkspaceActions.loadWorkspacesByCoworking),
      switchMap(({ coworkingId }) =>
        this.workspaceService.getByCoworkingId(coworkingId).pipe(
          map((workspaces) =>
            WorkspaceActions.loadWorkspacesByCoworkingSuccess({
              workspaces,
              coworkingId,
            })
          ),
          catchError((error) =>
            of(
              WorkspaceActions.loadWorkspacesByCoworkingFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
  loadWorkspaceById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkspaceActions.loadWorkspaceById),
      mergeMap(({ id }) =>
        this.workspaceService.getById(id).pipe(
          map((workspace) =>
            WorkspaceActions.loadWorkspaceByIdSuccess({ workspace })
          ),
          catchError((error) =>
            of(
              WorkspaceActions.loadWorkspaceByIdFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private workspaceService: WorkspaceService
  ) {}
}
