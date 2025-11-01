import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';
import { AuthResponse } from '../../models/auth/AuthResponse';
import { jwtDecode } from 'jwt-decode';

function setStorage(response: AuthResponse): DecodedToken | null {
  try {
    localStorage.setItem('accessToken', response.accessToken);
    const user = jwtDecode<DecodedToken>(response.accessToken);
    return user;
  } catch (e) {
    console.error('Failed to decode or store token', e);
    return null;
  }
}
// Допоміжна функція для очищення
function clearStorageAndState(): AuthState {
  localStorage.removeItem('accessToken');
  return initialAuthState;
}

export const authReducer = createReducer(
  initialAuthState,

  // --- Login / Register / Refresh ---
  on(
    AuthActions.login,
    AuthActions.register,
    AuthActions.refreshToken,
    (state): AuthState => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),

  // --- Успіх ---
  on(
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    AuthActions.refreshTokenSuccess,
    (state, { authResponse }): AuthState => {
      const user = setStorage(authResponse);
      if (!user) {
        return { ...state, isLoading: false, error: 'Invalid token received.' };
      }
      return {
        ...state,
        isLoading: false,
        error: null,
        accessToken: authResponse.accessToken,
        user: user,
      };
    }
  ),
  // --- Невдача ---
  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    AuthActions.refreshTokenFailure,
    (state, { error }): AuthState => ({
      ...state,
      isLoading: false,
      error: error,
    })
  ),

  // --- Logout ---
  on(AuthActions.logout, (): AuthState => {
    return clearStorageAndState();
  }),

  // --- Завантаження зі сховища при старті ---
  on(AuthActions.loadAuthFromStorage, (state): AuthState => {
    const accessToken = localStorage.getItem('accessToken'); // ИЗМЕНЕНИЕ: Больше не читаем refreshToken из localStorage // const refreshToken = localStorage.getItem('refreshToken'); // <-- УДАЛЕНО // ИЗМЕНЕНИЕ: Убираем проверку на refreshToken
    if (!accessToken) {
      return initialAuthState;
    }

    try {
      const user = jwtDecode<DecodedToken>(accessToken);
      const isExpired = user.exp * 1000 < Date.now();

      if (isExpired) {
        return clearStorageAndState();
      }

      return {
        ...state,
        accessToken: accessToken,
        user: user,
      };
    } catch (error) {
      return clearStorageAndState();
    }
  })
);
