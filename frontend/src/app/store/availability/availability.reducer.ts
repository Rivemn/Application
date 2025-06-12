// availability.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadAvailabilitiesByWorkspace,
  loadAvailabilitiesByWorkspaceSuccess,
  loadAvailabilitiesByWorkspaceFailure,
  loadAvailabilityById,
  loadAvailabilityByIdSuccess,
  loadAvailabilityByIdFailure,
} from './availability.actions';
import { AvailabilityState } from './availability.state';

export const initialState: AvailabilityState = {
  availabilities: [],
  availabilityById: {},
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
  on(loadAvailabilitiesByWorkspaceSuccess, (state, { availabilities }) => {
    const existingIds = new Set(state.availabilities.map((a) => a.id));
    const newOnes = availabilities.filter((a) => !existingIds.has(a.id));

    return {
      ...state,
      availabilities: [...state.availabilities, ...newOnes],
      loading: false,
      error: null,
    };
  }),

  on(loadAvailabilitiesByWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadAvailabilityById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadAvailabilityByIdSuccess, (state, { availability }) => ({
    ...state,
    availabilityById: {
      ...state.availabilityById,
      [availability.id]: availability,
    },
    availabilities: state.availabilities.some((a) => a.id === availability.id)
      ? state.availabilities
      : [...state.availabilities, availability],
    loading: false,
    error: null,
  })),
  on(loadAvailabilityByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
