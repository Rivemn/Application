import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenity } from '../contracts/Amenity';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceAmenityService {
  private readonly baseUrl = '/api/workspaces';

  constructor(private http: HttpClient) {}

  getAmenitiesByWorkspaceId(workspaceId: string): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.baseUrl}/${workspaceId}/amenities`);
  }
}
