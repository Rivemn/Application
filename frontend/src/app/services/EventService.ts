import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../models/EventDto';
import { CreateEventDto } from '../models/CreateEventDto';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:5028/api/Event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.apiUrl);
  }

  joinEvent(eventId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/join`, {});
  }
  getMyEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(`${this.apiUrl}/my-events`);
  }
  createEvent(eventData: CreateEventDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.apiUrl, eventData);
  }
}
