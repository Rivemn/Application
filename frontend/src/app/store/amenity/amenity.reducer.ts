import { createReducer, on } from '@ngrx/store';
import {
  loadAmenitiesByWorkspace,
  loadAmenitiesByWorkspaceSuccess,
  loadAmenitiesByWorkspaceFailure,
} from './amenity.actions';
import { AmenityState } from './amenity.state';

export const initialState: AmenityState = {
  amenities: [],
  loading: false,
  error: null,
};

export const amenityReducer = createReducer(
  initialState,
  on(loadAmenitiesByWorkspace, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadAmenitiesByWorkspaceSuccess, (state, { amenities, workspaceId }) => ({
    ...state,
    amenities: [
      ...state.amenities.filter((a) => a.workspaceId !== workspaceId),
      ...amenities.map((amenity) => ({ ...amenity, workspaceId })),
    ],
    loading: false,
    error: null,
  })),
  on(loadAmenitiesByWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
