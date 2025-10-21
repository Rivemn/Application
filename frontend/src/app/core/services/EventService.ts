import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../../models/EventDto';
import { CreateEventDto } from '../../models/CreateEventDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/Event`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.apiUrl);
  }
  getEventById(id: string): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }
  leaveEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}/leave`);
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
