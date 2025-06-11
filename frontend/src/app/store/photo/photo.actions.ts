import { createAction, props } from '@ngrx/store';
import { Photo } from '../../contracts/Photo';

export const loadPhotosByWorkspace = createAction(
  '[Photo] Load Photos By Workspace',
  props<{ workspaceId: string }>()
);
export const loadPhotosByWorkspaceSuccess = createAction(
  '[Photo] Load Photos By Workspace Success',
  props<{ photos: Photo[] }>()
);
export const loadPhotosByWorkspaceFailure = createAction(
  '[Photo] Load Photos By Workspace Failure',
  props<{ error: string }>()
);

export const loadPhotosByCoworking = createAction(
  '[Photo] Load Photos By Coworking',
  props<{ coworkingId: string }>()
);
export const loadPhotosByCoworkingSuccess = createAction(
  '[Photo] Load Photos By Coworking Success',
  props<{ photos: Photo[] }>()
);
export const loadPhotosByCoworkingFailure = createAction(
  '[Photo] Load Photos By Coworking Failure',
  props<{ error: string }>()
);
