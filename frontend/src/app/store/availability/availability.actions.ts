// availability.actions.ts
import { createAction, props } from '@ngrx/store';
import { Availability } from '../../contracts/Availability';

export const loadAvailabilitiesByWorkspace = createAction(
  '[Availability] Load Availabilities By Workspace',
  props<{ workspaceId: string }>()
);
export const loadAvailabilitiesByWorkspaceSuccess = createAction(
  '[Availability] Load Availabilities By Workspace Success',
  props<{ availabilities: Availability[] }>()
);
export const loadAvailabilitiesByWorkspaceFailure = createAction(
  '[Availability] Load Availabilities By Workspace Failure',
  props<{ error: string }>()
);

export const loadAvailabilityById = createAction(
  '[Availability] Load Availability By Id',
  props<{ id: string }>()
);

export const loadAvailabilityByIdSuccess = createAction(
  '[Availability] Load Availability By Id Success',
  props<{ availability: Availability }>()
);

export const loadAvailabilityByIdFailure = createAction(
  '[Availability] Load Availability By Id Failure',
  props<{ error: string }>()
);
