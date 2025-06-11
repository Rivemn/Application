import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroqService {
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  sendQuery(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map((response) => response.choices[0].message.content),
      catchError((error) => {
        console.error('Groq API error:', error);
        return throwError(
          () => new Error('Failed to fetch response from Groq API')
        );
      })
    );
  }
}
