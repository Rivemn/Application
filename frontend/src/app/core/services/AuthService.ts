import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../../models/auth/AuthResponse';
import { LoginRequest } from '../../models/auth/LoginRequest';
import { RegisterRequest } from '../../models/auth/RegisterRequest';
import { environment } from '../../../environments/environment';
import { AuthResult } from '../../models/auth/AuthResult';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  private currentUserSubject = new BehaviorSubject<DecodedToken | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public get currentUserId(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.sub : null;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.loadInitialUser();
  }

  private loadInitialUser(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          this.currentUserSubject.next(decodedToken);
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Invalid token found', error);
        this.logout();
      }
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.handleAuthentication(response.token);
        }
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        if (response.token) {
          this.handleAuthentication(response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private handleAuthentication(token: string): void {
    localStorage.setItem('auth_token', token);
    const decodedToken = jwtDecode<DecodedToken>(token);
    this.currentUserSubject.next(decodedToken);
    this.currentUserSubject.next(decodedToken);
    setTimeout(() => document.dispatchEvent(new Event('user-updated')));
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
