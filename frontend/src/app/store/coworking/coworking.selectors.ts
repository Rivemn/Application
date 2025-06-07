import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoworkingState } from './coworking.reducer';

export const selectCoworkingState =
  createFeatureSelector<CoworkingState>('coworking');

export const selectCoworkings = createSelector(
  selectCoworkingState,
  (state: CoworkingState) => state.coworkings
);

export const selectCoworkingLoading = createSelector(
  selectCoworkingState,
  (state) => state.loading
);

export const selectCoworkingError = createSelector(
  selectCoworkingState,
  (state: CoworkingState) => state.error
);
