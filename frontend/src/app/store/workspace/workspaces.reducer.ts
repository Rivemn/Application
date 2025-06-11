import { createReducer, on } from '@ngrx/store';
import * as WorkspaceActions from './workspace.actions';
import { initialState, WorkspaceState } from './workspace.state';

export const workspaceReducer = createReducer(
  initialState,
  on(WorkspaceActions.loadWorkspacesByCoworking, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    WorkspaceActions.loadWorkspacesByCoworkingSuccess,
    (state, { workspaces, coworkingId }) => {
      const filteredWorkspaces = state.workspaces.filter(
        (w) => w.coworkingId !== coworkingId
      );
      return {
        ...state,
        workspaces: [...filteredWorkspaces, ...workspaces],
        loading: false,
        error: null,
      };
    }
  ),
  on(WorkspaceActions.loadWorkspacesByCoworkingFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(WorkspaceActions.loadWorkspaceById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(WorkspaceActions.loadWorkspaceByIdSuccess, (state, { workspace }) => {
    const workspaceExists = state.workspaces.some((w) => w.id === workspace.id);
    return {
      ...state,
      workspaces: workspaceExists
        ? state.workspaces.map((w) => (w.id === workspace.id ? workspace : w))
        : [...state.workspaces, workspace],
      selectedWorkspace: workspace,
      loading: false,
      error: null,
    };
  }),
  on(WorkspaceActions.loadWorkspaceByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(WorkspaceActions.setSelectedWorkspace, (state, { workspace }) => ({
    ...state,
    selectedWorkspace: workspace,
  }))
);
