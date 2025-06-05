// availability.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AvailabilityState } from './availability.state';

export const selectAvailabilityState =
  createFeatureSelector<AvailabilityState>('availability');

export const selectAllAvailabilities = createSelector(
  selectAvailabilityState,
  (state) => state.availabilities
);

export const selectAvailabilityLoading = createSelector(
  selectAvailabilityState,
  (state) => state.loading
);

export const selectAvailabilityError = createSelector(
  selectAvailabilityState,
  (state) => state.error
);
