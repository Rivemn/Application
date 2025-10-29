import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoading = createSelector(selectAuthState, (state) => state.isLoading);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => !!state.accessToken);

export const selectCurrentUser = createSelector(selectAuthState, (state) => state.user);

export const selectAccessToken = createSelector(selectAuthState, (state) => state.accessToken);

export const selectRefreshToken = createSelector(selectAuthState, (state) => state.refreshToken);
