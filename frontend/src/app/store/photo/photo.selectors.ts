import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotoState } from './photo.state';

export const selectPhotoState = createFeatureSelector<PhotoState>('photo');

export const selectAllPhotos = createSelector(
  selectPhotoState,
  (state) => state.photos
);

export const selectPhotosByWorkspace = (workspaceId: string) =>
  createSelector(selectAllPhotos, (photos) =>
    photos.filter((photo) => photo.workspaceId === workspaceId)
  );

export const selectPhotosByCoworking = (coworkingId: string) =>
  createSelector(selectAllPhotos, (photos) =>
    photos.filter((photo) => photo.coworkingId === coworkingId)
  );

export const selectPhotoLoading = createSelector(
  selectPhotoState,
  (state) => state.loading
);

export const selectPhotoError = createSelector(
  selectPhotoState,
  (state) => state.error
);
