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
