import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../contracts/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = '/api/Photo';

  constructor(private http: HttpClient) {}

  getByWorkspaceId(workspaceId: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/${workspaceId}`);
  }

  addPhoto(photo: { url: string; workspaceId: string }): Observable<Photo> {
    return this.http.post<Photo>(this.apiUrl, photo);
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
