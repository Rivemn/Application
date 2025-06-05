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

export const addPhoto = createAction(
  '[Photo] Add Photo',
  props<{ photo: { url: string; workspaceId: string } }>()
);
export const addPhotoSuccess = createAction(
  '[Photo] Add Photo Success',
  props<{ photo: Photo }>()
);
export const addPhotoFailure = createAction(
  '[Photo] Add Photo Failure',
  props<{ error: string }>()
);

export const deletePhoto = createAction(
  '[Photo] Delete Photo',
  props<{ id: number }>()
);
export const deletePhotoSuccess = createAction(
  '[Photo] Delete Photo Success',
  props<{ id: number }>()
);
export const deletePhotoFailure = createAction(
  '[Photo] Delete Photo Failure',
  props<{ error: string }>()
);
