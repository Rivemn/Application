import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../store/auth/auth.selectors';
import { AuthState } from '../../store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      req.url.includes('/api/Auth/login') ||
      req.url.includes('/api/Auth/register') ||
      req.url.includes('/api/Auth/refresh')
    ) {
      return next.handle(req);
    }

    return this.addTokenToRequest(req, next);
  }

  private addTokenToRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });

          return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                console.error('Interceptor: 401 Error, logging out.');
                this.store.dispatch(AuthActions.logout());
              }
              return throwError(() => error);
            })
          );
        }

        return next.handle(req);
      })
    );
  }
}
