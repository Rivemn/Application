export interface AuthState {
  accessToken: string | null;

  user: DecodedToken | null;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: null,

  user: null,
  isLoading: false,
  error: null,
};
