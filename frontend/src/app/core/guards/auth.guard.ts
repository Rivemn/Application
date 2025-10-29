import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';
import { AuthState } from '../../store/auth/auth.state';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  // Отримуємо стан зі стору
  return store.select(selectIsLoggedIn).pipe(
    take(1), // Беремо одне значення і відписуємося
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true; // Дозволяємо доступ
      }

      // Користувач не залогінений, перенаправляємо на сторінку логіну
      console.log('AuthGuard: User not logged in, redirecting to /login');
      return router.createUrlTree(['/login']);
    })
  );
};
