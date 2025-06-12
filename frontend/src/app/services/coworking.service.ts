import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Coworking } from '../contracts/Coworking';

@Injectable({
  providedIn: 'root',
})
export class CoworkingService {
  private apiUrl = '/api/Coworking';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Coworking[]> {
    return this.http.get<Coworking[]>(this.apiUrl);
  }
  getById(id: string): Observable<Coworking> {
    return this.http.get<Coworking>(`${this.apiUrl}/${id}`);
  }
}
