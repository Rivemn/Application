import { Workspace } from '../../contracts/Workspace';

export interface WorkspaceState {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
}

export const initialState: WorkspaceState = {
  workspaces: [],
  selectedWorkspace: null,
  loading: false,
  error: null,
};
