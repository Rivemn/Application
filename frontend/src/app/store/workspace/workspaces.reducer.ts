// workspace.reducer.ts
import { createReducer, on } from '@ngrx/store';

import { WorkspaceState } from './workspace.state';
import {
  createWorkspace,
  createWorkspaceFailure,
  createWorkspaceSuccess,
  deleteWorkspace,
  deleteWorkspaceFailure,
  deleteWorkspaceSuccess,
  loadWorkspaceById,
  loadWorkspaceByIdFailure,
  loadWorkspaceByIdSuccess,
  loadWorkspaces,
  loadWorkspacesFailure,
  loadWorkspacesSuccess,
} from './workspace.actions';

export const initialState: WorkspaceState = {
  workspaces: [],
  selectedWorkspace: null,
  loading: false,
  error: null,
};

export const workspaceReducer = createReducer(
  initialState,
  on(loadWorkspaces, (state) => ({ ...state, loading: true, error: null })),
  on(loadWorkspacesSuccess, (state, { workspaces }) => ({
    ...state,
    workspaces,
    loading: false,
    error: null,
  })),
  on(loadWorkspacesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadWorkspaceById, (state) => ({ ...state, loading: true, error: null })),
  on(loadWorkspaceByIdSuccess, (state, { workspace }) => ({
    ...state,
    selectedWorkspace: workspace,
    loading: false,
    error: null,
  })),
  on(loadWorkspaceByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(createWorkspace, (state) => ({ ...state, loading: true, error: null })),
  on(createWorkspaceSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(createWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteWorkspace, (state) => ({ ...state, loading: true, error: null })),
  on(deleteWorkspaceSuccess, (state, { id }) => ({
    ...state,
    workspaces: state.workspaces.filter((workspace) => workspace.id !== id),
    loading: false,
    error: null,
  })),
  on(deleteWorkspaceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
