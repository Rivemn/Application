import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../contracts/Availability';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private readonly baseUrl = '/api/Availability';

  constructor(private http: HttpClient) {}

  getByWorkspaceId(workspaceId: string): Observable<Availability[]> {
    return this.http.get<Availability[]>(
      `${this.baseUrl}/workspace/${workspaceId}`
    );
  }
  getById(id: string): Observable<Availability> {
    return this.http.get<Availability>(`${this.baseUrl}/${id}`);
  }
}
