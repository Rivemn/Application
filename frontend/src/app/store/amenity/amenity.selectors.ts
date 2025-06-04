import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AmenityState } from './amenity.state';

export const selectAmenityState =
  createFeatureSelector<AmenityState>('amenity');

export const selectAllAmenities = createSelector(
  selectAmenityState,
  (state) => state.amenities
);

export const selectAmenityLoading = createSelector(
  selectAmenityState,
  (state) => state.loading
);

export const selectAmenityError = createSelector(
  selectAmenityState,
  (state) => state.error
);
