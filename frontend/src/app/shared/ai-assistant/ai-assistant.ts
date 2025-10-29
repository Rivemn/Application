import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AiAssistantService } from '../services/ai-assistant.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: false,
  templateUrl: './ai-assistant.html',
  styleUrl: './ai-assistant.scss',
})
export class AiAssistant {
  @Input() selectedTagIds: string[] = [];

  // --- ОНОВЛЕНО: Використовуємо FormGroup ---
  form: FormGroup;
  // public questionControl = new FormControl(''); // Видалено
  // -------------------------------------

  public isLoading = signal(false);
  public answer = signal<string | null>(null);

  // Впроваджуємо FormBuilder
  constructor(private aiService: AiAssistantService, private fb: FormBuilder) {
    this.form = this.fb.group({
      question: ['', Validators.required], // Додаємо 'question' FormControl
    });
  }

  onSubmit(): void {
    // --- ОНОВЛЕНО: Отримуємо значення з FormGroup ---
    const question = this.form.value.question;
    if (this.form.invalid || !question || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }
    // -----------------------------------------

    this.isLoading.set(true);
    this.answer.set(null);

    this.aiService.askQuestion(question, this.selectedTagIds).subscribe({
      next: (response) => {
        this.answer.set(response.answer);
        this.isLoading.set(false);
        this.form.reset(); // Скидаємо форму
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage =
          err.error?.Errors?.[0] || "Sorry, I'm having trouble connecting right now.";
        this.answer.set(errorMessage);
        this.isLoading.set(false);
      },
    });
  }
}
