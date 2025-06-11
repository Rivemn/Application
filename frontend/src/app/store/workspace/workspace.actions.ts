// workspace.actions.ts
import { createAction, props } from '@ngrx/store';
import { Workspace } from '../../contracts/Workspace';
import { WorkspaceRequest } from '../../contracts/WorkspaceRequest';

export const loadWorkspacesByCoworking = createAction(
  '[Workspace] Load By CoworkingId',
  props<{ coworkingId: string }>()
);

export const loadWorkspacesByCoworkingSuccess = createAction(
  '[Workspace] Load By CoworkingId Success',
  props<{ workspaces: Workspace[]; coworkingId: string }>()
);

export const loadWorkspacesByCoworkingFailure = createAction(
  '[Workspace] Load By CoworkingId Failure',
  props<{ error: string }>()
);
export const loadWorkspaceById = createAction(
  '[Workspace] Load By Id',
  props<{ id: string }>()
);

export const loadWorkspaceByIdSuccess = createAction(
  '[Workspace] Load By Id Success',
  props<{ workspace: Workspace }>()
);

export const loadWorkspaceByIdFailure = createAction(
  '[Workspace] Load By Id Failure',
  props<{ error: string }>()
);
export const setSelectedWorkspace = createAction(
  '[Workspace] Set Selected Workspace',
  props<{ workspace: Workspace }>()
);
