import { createAction, props } from '@ngrx/store';
import { Amenity } from '../../contracts/Amenity';

export const loadAmenitiesByWorkspace = createAction(
  '[Amenity] Load Amenities By Workspace',
  props<{ workspaceId: string }>()
);
export const loadAmenitiesByWorkspaceSuccess = createAction(
  '[Amenity] Load Amenities By Workspace Success',
  props<{ amenities: Amenity[]; workspaceId: string }>()
);
export const loadAmenitiesByWorkspaceFailure = createAction(
  '[Amenity] Load Amenities By Workspace Failure',
  props<{ error: string }>()
);
