import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviability } from '../contracts/Aviability';

@Injectable({
  providedIn: 'root',
})
export class AviabilityService {
  private readonly baseUrl = '/api/Aviability';

  constructor(private http: HttpClient) {}

  getByWorkspaceId(workspaceId: string): Observable<Aviability[]> {
    return this.http.get<Aviability[]>(
      `${this.baseUrl}/workspace/${workspaceId}`
    );
  }
}
