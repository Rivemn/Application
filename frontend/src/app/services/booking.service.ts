import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  create(request: BookingRequest): Observable<string> {
    return this.http.post<string>(this.baseUrl, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
