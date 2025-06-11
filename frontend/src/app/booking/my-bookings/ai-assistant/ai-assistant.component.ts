import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroqService } from '../../../services/groq.service';
import { BookingDetails } from '../my-bookings.component';

@Component({
  selector: 'app-ai-assistant',
  standalone: false,
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss'],
})
export class AiAssistantComponent {
  @Input() bookings: BookingDetails[] = [];
  inputText: string = '';
  response: string = '';
  isLoading: boolean = false;

  constructor(private groqService: GroqService) {}

  setInputText(text: string): void {
    this.inputText = text;
  }

  onSubmit(): void {
    if (!this.inputText.trim()) {
      this.response = 'Please enter a question.';
      return;
    }

    this.isLoading = true;
    this.response = '';

    const bookingData = this.bookings.map((item) => ({
      id: item.booking.id,
      workspaceName: item.workspace?.name || 'Unknown',
      workspaceType: item.workspace?.availabilityUnit || 'Unknown',
      start: new Date(item.booking.start).toISOString(),
      end: new Date(item.booking.end).toISOString(),
      status: item.booking.status,
    }));

    const prompt = `
      You are an AI assistant helping a user manage their bookings. Below is the user's booking data in JSON format. The 'workspaceType' field (representing availabilityUnit) indicates the type of workspace, such as "private room" or "open space". Use this data to answer the user's question accurately. Provide a concise, natural language response. If the question cannot be answered with the provided data, say so politely. Today's date is ${
        new Date().toISOString().split('T')[0]
      }.

      Booking Data:
      ${JSON.stringify(bookingData, null, 2)}

      User Question:
      ${this.inputText}
    `;

    this.groqService
      .sendQuery(prompt)
      .pipe(
        map((result) => result.trim()),
        catchError((error) => {
          console.error('Error:', error);
          return of(
            'Sorry, I couldn’t process your request due to an error. Please try again.'
          );
        })
      )
      .subscribe((response) => {
        this.response = response;
        this.isLoading = false;
      });
  }
}
