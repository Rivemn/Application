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
import { RefreshTokenRequestDto } from '../../models/auth/RefreshTokenRequestDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterRequest): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}/login`, data);
  }

  refresh(data: RefreshTokenRequestDto, accessToken: string): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}/refresh`, data);
  }
}
