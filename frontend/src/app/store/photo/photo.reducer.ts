import { createReducer, on } from '@ngrx/store';
import {
  loadPhotosByWorkspace,
  loadPhotosByWorkspaceSuccess,
  loadPhotosByWorkspaceFailure,
  loadPhotosByCoworking,
  loadPhotosByCoworkingSuccess,
  loadPhotosByCoworkingFailure,
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

  on(loadPhotosByCoworking, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadPhotosByCoworkingSuccess, (state, { photos }) => ({
    ...state,
    photos: [...state.photos, ...photos],
    loading: false,
    error: null,
  })),
  on(loadPhotosByCoworkingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
