import { createAction, props } from '@ngrx/store';
import { Coworking } from '../../contracts/Coworking';

export const loadCoworkings = createAction('[Coworking] Load Coworkings');
export const loadCoworkingsSuccess = createAction(
  '[Coworking] Load Coworkings Success',
  props<{ coworkings: Coworking[] }>()
);
export const loadCoworkingsFailure = createAction(
  '[Coworking] Load Coworkings Failure',
  props<{ error: string }>()
);
