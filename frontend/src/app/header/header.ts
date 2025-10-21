import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/AuthService';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isAuthenticated = false;
  userName: string | null = null;
  private authSubscription!: Subscription;

  constructor(
    public router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe((user: DecodedToken | null) => {
      this.isAuthenticated = !!user;
      this.userName = user ? user.fullName : null;

      this.cdr.markForCheck();
    });
    document.addEventListener('user-updated', () => {
      this.cdr.detectChanges();
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
