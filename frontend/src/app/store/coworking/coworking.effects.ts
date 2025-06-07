import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadCoworkings,
  loadCoworkingsSuccess,
  loadCoworkingsFailure,
} from './coworking.actions';
import { CoworkingService } from '../../services/coworking.service';

@Injectable()
export class CoworkingEffects {
  loadCoworkings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCoworkings),
      mergeMap(() =>
        this.coworkingService.getAll().pipe(
          map((coworkings) => loadCoworkingsSuccess({ coworkings })),
          catchError((error) =>
            of(loadCoworkingsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coworkingService: CoworkingService
  ) {}
}
