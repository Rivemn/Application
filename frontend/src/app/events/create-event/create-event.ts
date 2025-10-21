import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEventDto } from '../../models/CreateEventDto';
import { Router } from '@angular/router';
import { EventService } from '../../core/services/EventService';

@Component({
  selector: 'app-create-event',
  standalone: false,
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent {
  eventForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.required],
      date: [null, Validators.required],
      time: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(300)]],
      capacity: [''], // Валидацию можно добавить позже, если нужно
      visibility: ['public', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      // Отмечаем все поля как "тронутые", чтобы показать ошибки валидации
      this.eventForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // --- 1. Подготовка данных для отправки ---
    const formValue = this.eventForm.value;

    // Объединяем дату и время в один объект Date
    const startDate = new Date(formValue.date);
    const [hours, minutes] = formValue.time.split(':');
    startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    // Формируем DTO для отправки на бэкенд
    const eventData: CreateEventDto = {
      title: formValue.title,
      description: formValue.description,
      start: startDate.toISOString(), // Преобразуем в строку формата ISO 8601
      end: null, // Логику для End date можно добавить позже
      location: formValue.location,
      // Преобразуем capacity в число или null, если поле пустое
      capacity: formValue.capacity ? parseInt(formValue.capacity, 10) : null,
      isPublic: formValue.visibility === 'public',
    };

    // --- 2. Вызов сервиса ---
    this.eventService.createEvent(eventData).subscribe({
      next: (createdEvent) => {
        this.isLoading = false;
        // Успех! Перенаправляем пользователя на страницу "Мои ивенты".
        alert(`Event "${createdEvent.title}" created successfully!`);
        this.router.navigate(['/my-events']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'An unexpected error occurred.';
        console.error('Event creation failed', err);
      },
    });
  }

  onCancel(): void {
    // Просто возвращаемся на предыдущую страницу
    this.router.navigate(['/my-events']);
  }
}
