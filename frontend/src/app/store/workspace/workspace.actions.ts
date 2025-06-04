// workspace.actions.ts
import { createAction, props } from '@ngrx/store';
import { Workspace } from '../../contracts/Workspace';
import { WorkspaceRequest } from '../../contracts/WorkspaceRequest';

export const loadWorkspaces = createAction('[Workspace] Load Workspaces');
export const loadWorkspacesSuccess = createAction(
  '[Workspace] Load Workspaces Success',
  props<{ workspaces: Workspace[] }>()
);
export const loadWorkspacesFailure = createAction(
  '[Workspace] Load Workspaces Failure',
  props<{ error: string }>()
);

export const loadWorkspaceById = createAction(
  '[Workspace] Load Workspace By Id',
  props<{ id: string }>()
);
export const loadWorkspaceByIdSuccess = createAction(
  '[Workspace] Load Workspace By Id Success',
  props<{ workspace: Workspace }>()
);
export const loadWorkspaceByIdFailure = createAction(
  '[Workspace] Load Workspace By Id Failure',
  props<{ error: string }>()
);

export const createWorkspace = createAction(
  '[Workspace] Create Workspace',
  props<{ request: WorkspaceRequest }>()
);
export const createWorkspaceSuccess = createAction(
  '[Workspace] Create Workspace Success',
  props<{ workspaceId: string }>()
);
export const createWorkspaceFailure = createAction(
  '[Workspace] Create Workspace Failure',
  props<{ error: string }>()
);

export const deleteWorkspace = createAction(
  '[Workspace] Delete Workspace',
  props<{ id: string }>()
);
export const deleteWorkspaceSuccess = createAction(
  '[Workspace] Delete Workspace Success',
  props<{ id: string }>()
);
export const deleteWorkspaceFailure = createAction(
  '[Workspace] Delete Workspace Failure',
  props<{ error: string }>()
);
