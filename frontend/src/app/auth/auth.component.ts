import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../store/auth/auth.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { selectIsLoading, selectAuthError } from '../store/auth/auth.selectors';
import { AuthState } from '../store/auth/auth.state';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginView = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AuthState>
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorMessage$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isLoginView = params['mode'] !== 'register';
    });

    this.initLoginForm();
    this.initRegisterForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private initRegisterForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // Додаємо валідатор (як у вашому коді)
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        ],
      ],
    });
  }

  toggleView(): void {
    this.isLoginView = !this.isLoginView;
    const mode = this.isLoginView ? null : 'register';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: mode },
      queryParamsHandling: 'merge',
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return;
    // --- ВИПРАВЛЕНО: 'data' на 'credentials' ---
    this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) return;
    // --- ВИПРАВЛЕНО: 'data' на 'registerData' ---
    this.store.dispatch(AuthActions.register({ registerData: this.registerForm.value }));
  }
}
