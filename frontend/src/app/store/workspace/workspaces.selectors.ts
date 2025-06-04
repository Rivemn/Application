// workspace.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceState } from './workspace.state';

export const selectWorkspaceState =
  createFeatureSelector<WorkspaceState>('workspace');

export const selectAllWorkspaces = createSelector(
  selectWorkspaceState,
  (state) => state.workspaces
);

export const selectSelectedWorkspace = createSelector(
  selectWorkspaceState,
  (state) => state.selectedWorkspace
);

export const selectWorkspaceLoading = createSelector(
  selectWorkspaceState,
  (state) => state.loading
);

export const selectWorkspaceError = createSelector(
  selectWorkspaceState,
  (state) => state.error
);
