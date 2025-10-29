import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface AiSimpleQueryDto {
  question: string;
  tagIds?: string[];
}

interface AiResponseDto {
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService {
  private readonly apiUrl = `${environment.apiUrl}/AiAssistant`;

  constructor(private http: HttpClient) {}

  /**
   * Відправляє запит до НАШОГО БЕКЕНДУ.
   * @param question Питання користувача
   * @param tagIds (Опціонально) Список ID тегів з поточного фільтра
   */
  public askQuestion(question: string, tagIds: string[] = []): Observable<AiResponseDto> {
    const payload: AiSimpleQueryDto = {
      question: question,
      tagIds: tagIds.length > 0 ? tagIds : undefined,
    };

    // Відправляємо запит на /api/AiAssistant/ask
    return this.http.post<AiResponseDto>(`${this.apiUrl}/ask`, payload);
  }
}
