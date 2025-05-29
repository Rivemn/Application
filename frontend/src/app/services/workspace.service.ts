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

  getAll(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.baseUrl);
  }

  getById(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.baseUrl}/${id}`);
  }

  create(request: WorkspaceRequest): Observable<string> {
    return this.http.post<string>(this.baseUrl, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
