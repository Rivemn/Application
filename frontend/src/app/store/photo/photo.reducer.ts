import { createReducer, on } from '@ngrx/store';
import {
  loadPhotosByWorkspace,
  loadPhotosByWorkspaceSuccess,
  loadPhotosByWorkspaceFailure,
  addPhoto,
  addPhotoSuccess,
  addPhotoFailure,
  deletePhoto,
  deletePhotoSuccess,
  deletePhotoFailure,
} from './photo.actions';
import { PhotoState } from './photo.state';

export const initialState: PhotoState = {
  photos: [],
  loading: false,
  error: null,
};

export const photoReducer = createReducer(
  initialState,
  on(loadPhotosByWorkspace, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadPhotosByWorkspaceSuccess, (state, { photos }) => ({
    ...state,
    photos: [...state.photos, ...photos],
    loading: false,
    error: null,
  })),
  on(loadPhotosByWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addPhoto, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(addPhotoSuccess, (state, { photo }) => ({
    ...state,
    photos: [...state.photos, photo],
    loading: false,
    error: null,
  })),
  on(addPhotoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deletePhoto, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(deletePhotoSuccess, (state, { id }) => ({
    ...state,
    photos: state.photos.filter((photo) => photo.id !== id),
    loading: false,
    error: null,
  })),
  on(deletePhotoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
