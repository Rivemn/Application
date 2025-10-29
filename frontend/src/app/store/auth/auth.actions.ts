import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../models/auth/LoginRequest';
import { RegisterRequest } from '../../models/auth/RegisterRequest';
import { AuthResponse } from '../../models/auth/AuthResponse';

// --- Login Actions ---
export const login = createAction('[Auth Component] Login', props<{ credentials: LoginRequest }>());
export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ authResponse: AuthResponse }>()
);
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: string }>());

// --- Register Actions ---
export const register = createAction(
  '[Auth Component] Register',
  props<{ registerData: RegisterRequest }>()
);
export const registerSuccess = createAction(
  '[Auth API] Register Success',
  props<{ authResponse: AuthResponse }>()
);
export const registerFailure = createAction(
  '[Auth API] Register Failure',
  props<{ error: string }>()
);

// --- Refresh Token Actions (приклад) ---
export const refreshToken = createAction('[Auth] Refresh Token');
export const refreshTokenSuccess = createAction(
  '[Auth API] Refresh Token Success',
  props<{ authResponse: AuthResponse }>()
);
export const refreshTokenFailure = createAction(
  '[Auth API] Refresh Token Failure',
  props<{ error: string }>()
);

// --- Logout Action ---
export const logout = createAction('[Auth] Logout');

// --- Action for initializing state from localStorage ---
export const loadAuthFromStorage = createAction('[Auth] Load Auth From Storage');
