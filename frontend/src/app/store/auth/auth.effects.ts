import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import {
  catchError,
  map,
  mergeMap,
  tap,
  switchMap,
  delayWhen,
  withLatestFrom,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer, of as rxOf, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.state';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResult } from '../../models/auth/AuthResult';
import { selectAccessToken } from './auth.selectors';

@Injectable()
export class AuthEffects {
  // Declare properties (no initializers)
  login$;
  register$;
  authSuccess$;
  scheduleRefresh$;
  refreshToken$;
  refreshFailure$;
  logout$;
  init$;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    // Initialize effects here (after DI)
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({ credentials }) =>
          this.authService.login(credentials).pipe(
            map((authResult: AuthResult) => {
              if (authResult.succeeded && authResult.response) {
                return AuthActions.loginSuccess({ authResponse: authResult.response });
              } else {
                return AuthActions.loginFailure({
                  error: authResult.errors?.join(', ') || 'Login failed',
                });
              }
            }),
            catchError((err: HttpErrorResponse) =>
              rxOf(AuthActions.loginFailure({ error: err.error?.Errors?.[0] || 'Login failed' }))
            )
          )
        )
      )
    );

    this.register$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap(({ registerData }) =>
          this.authService.register(registerData).pipe(
            map((authResult: AuthResult) => {
              if (authResult.succeeded && authResult.response) {
                return AuthActions.registerSuccess({ authResponse: authResult.response });
              } else {
                return AuthActions.registerFailure({
                  error: authResult.errors?.join(', ') || 'Register failed',
                });
              }
            }),
            catchError((err: HttpErrorResponse) =>
              rxOf(
                AuthActions.registerFailure({ error: err.error?.Errors?.[0] || 'Register failed' })
              )
            )
          )
        )
      )
    );

    this.authSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
          tap(({ authResponse }) => {
            this.router.navigate(['/events']);
          })
        ),
      { dispatch: false }
    );

    this.scheduleRefresh$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.registerSuccess,
          AuthActions.refreshTokenSuccess
        ),
        switchMap(({ authResponse }) => {
          const expiresAt = new Date(authResponse.expiresAt as string).getTime();
          const now = Date.now();
          const msUntil = Math.max(0, expiresAt - now - 60_000);
          console.log(`NgRx: Scheduling token refresh in ${msUntil / 1000}s`);
          return timer(msUntil).pipe(map(() => AuthActions.refreshToken()));
        })
      )
    );

    this.refreshToken$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.refreshToken), // withLatestFrom(this.store.select(selectRefreshToken), this.store.select(selectAccessToken)), // switchMap(([action, refreshToken, accessToken]) => { // <-- Старая строка
        // ИЗМЕНЕНИЕ: Убираем withLatestFrom, т.к. refreshToken больше не в state
        switchMap(() => {
          // <-- Новая строка

          // ИЗМЕНЕНИЕ: Убираем проверку на refreshToken
          // if (!refreshToken || !accessToken) { ... } // <-- УДАЛЕНО

          // ИЗМЕНЕНИЕ: Вызываем authService.refresh() без аргументов
          // return this.authService.refresh({ refreshToken }, accessToken).pipe( // <-- Старая строка
          return this.authService.refresh().pipe(
            // <-- Новая строка
            map((authResult: AuthResult) => {
              if (authResult.succeeded && authResult.response) {
                return AuthActions.refreshTokenSuccess({ authResponse: authResult.response });
              } else {
                return AuthActions.refreshTokenFailure({
                  error: authResult.errors?.join(', ') || 'Refresh failed',
                });
              }
            }),
            catchError((err: HttpErrorResponse) =>
              rxOf(
                AuthActions.refreshTokenFailure({
                  error: err.error?.Errors?.[0] || 'Refresh failed',
                })
              )
            )
          );
        })
      )
    );
    this.refreshFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenFailure),
        map(() => AuthActions.logout())
      )
    );

    this.logout$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logout),
          tap(() => {
            this.router.navigate(['/login']);
          })
        ),
      { dispatch: false }
    );

    this.init$ = createEffect(() => {
      return rxOf(AuthActions.loadAuthFromStorage());
    });
  }
}
