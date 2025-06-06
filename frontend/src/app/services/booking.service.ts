import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Booking } from '../contracts/Booking';
import { BookingRequest } from '../contracts/BookingRequest';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly baseUrl = '/api/Booking';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }
  getByUser(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${userId}`);
  }
  getByUserEmail(email: string): Observable<Booking[]> {
    return this.http
      .get<Booking[]>(`${this.baseUrl}/user/by-email`, { params: { email } })
      .pipe(
        catchError((error) => {
          console.error(`Error fetching bookings for email ${email}:`, error);
          return throwError(
            () =>
              new Error(error.message || 'Failed to fetch bookings by email')
          );
        })
      );
  }

  create(request: BookingRequest): Observable<string> {
    return this.http
      .post<{ id: string }>(this.baseUrl, request, { responseType: 'json' })
      .pipe(
        map((response) => response.id),
        catchError((error) => {
          console.error('Booking creation error:', error);
          return throwError(
            () => new Error(error.error || 'Failed to create booking')
          );
        })
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
