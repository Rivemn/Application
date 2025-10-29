export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: DecodedToken | null;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  error: null,
};
