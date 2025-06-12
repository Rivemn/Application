import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workspace } from '../contracts/Workspace';
import { WorkspaceRequest } from '../contracts/WorkspaceRequest';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private readonly baseUrl = '/api/Workspace';

  constructor(private http: HttpClient) {}

  getByCoworkingId(coworkingId: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(
      `${this.baseUrl}/by-coworking/${coworkingId}`
    );
  }
  getById(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.baseUrl}/${id}`);
  }
}
