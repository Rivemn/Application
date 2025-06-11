import { createReducer, on } from '@ngrx/store';
import {
  loadCoworkings,
  loadCoworkingsSuccess,
  loadCoworkingsFailure,
  loadCoworkingById,
  loadCoworkingByIdSuccess,
  loadCoworkingByIdFailure,
} from './coworking.actions';
import { initialState } from './coworking.state';

export const coworkingReducer = createReducer(
  initialState,
  on(loadCoworkings, (state) => ({ ...state, loading: true, error: null })),
  on(loadCoworkingsSuccess, (state, { coworkings }) => ({
    ...state,
    coworkings,
    loading: false,
    error: null,
  })),
  on(loadCoworkingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadCoworkingById, (state) => ({ ...state, loading: true, error: null })),
  on(loadCoworkingByIdSuccess, (state, { coworking }) => ({
    ...state,
    selectedCoworking: coworking,
    loading: false,
    error: null,
  })),
  on(loadCoworkingByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
