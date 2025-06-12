// workspace.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceState } from './workspace.state';

export const selectWorkspaceState =
  createFeatureSelector<WorkspaceState>('workspace');

export const selectWorkspacesByCoworking = createSelector(
  selectWorkspaceState,
  (state) => state.workspaces
);

export const selectWorkspacesByCoworkingLoading = createSelector(
  selectWorkspaceState,
  (state) => state.loading
);

export const selectWorkspacesByCoworkingError = createSelector(
  selectWorkspaceState,
  (state) => state.error
);
export const selectSelectedWorkspace = createSelector(
  selectWorkspaceState,
  (state) => state.selectedWorkspace
);
