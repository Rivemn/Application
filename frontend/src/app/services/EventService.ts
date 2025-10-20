import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../models/EventDto';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:5028/api/Event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.apiUrl);
  }
}
