import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  isLoginView = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  // 2. Внедряем ActivatedRoute в конструктор
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['mode'] === 'register') {
        this.isLoginView = false;
      } else {
        this.isLoginView = true;
      }
      this.cdr.markForCheck();
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
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        ],
      ],
    });
  }

  toggleView(): void {
    this.isLoginView = !this.isLoginView;
    this.errorMessage = null;

    const mode = this.isLoginView ? null : 'register';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: mode },
      queryParamsHandling: 'merge',
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.Errors?.[0] || 'Invalid credentials. Please try again.';
        this.cdr.markForCheck();
      },
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.Errors?.[0] || 'Registration failed. The email may already be in use.';
        this.cdr.markForCheck();
      },
    });
  }
}
