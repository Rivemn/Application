import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoworkingState } from './coworking.state';

export const selectCoworkingState =
  createFeatureSelector<CoworkingState>('coworking');

export const selectCoworkings = createSelector(
  selectCoworkingState,
  (state: CoworkingState) => state.coworkings
);

export const selectSelectedCoworking = createSelector(
  selectCoworkingState,
  (state) => state.selectedCoworking
);

export const selectCoworkingLoading = createSelector(
  selectCoworkingState,
  (state) => state.loading
);

export const selectCoworkingError = createSelector(
  selectCoworkingState,
  (state) => state.error
);
