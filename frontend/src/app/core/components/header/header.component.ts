import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectCurrentUser } from '../../../store/auth/auth.selectors';
import { AuthState } from '../../../store/auth/auth.state';
import * as AuthActions from '../../../store/auth/auth.actions';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isAuthenticated$!: Observable<boolean>;
  userName$!: Observable<string | null>;

  constructor(public router: Router, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsLoggedIn);

    this.userName$ = this.store
      .select(selectCurrentUser)
      .pipe(map((user: DecodedToken | null) => (user ? user.fullName : null)));
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {}
}
