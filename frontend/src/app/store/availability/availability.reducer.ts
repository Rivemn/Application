// availability.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadAvailabilitiesByWorkspace,
  loadAvailabilitiesByWorkspaceSuccess,
  loadAvailabilitiesByWorkspaceFailure,
} from './availability.actions';
import { AvailabilityState } from './availability.state';

export const initialState: AvailabilityState = {
  availabilities: [],
  loading: false,
  error: null,
};

export const availabilityReducer = createReducer(
  initialState,
  on(loadAvailabilitiesByWorkspace, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadAvailabilitiesByWorkspaceSuccess, (state, { availabilities }) => ({
    ...state,
    availabilities: [...state.availabilities, ...availabilities],
    loading: false,
    error: null,
  })),
  on(loadAvailabilitiesByWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
