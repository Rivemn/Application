import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEventDto } from '../../models/CreateEventDto';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventFormData } from '../../models/EventFormData';

@Component({
  selector: 'app-create-event',
  standalone: false,
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent {
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private eventService: EventService, private router: Router) {}

  handleFormSubmit(formData: EventFormData): void {
    this.isLoading = true;
    this.errorMessage = null;

    const eventData: CreateEventDto = { ...formData };

    this.eventService.createEvent(eventData).subscribe({
      next: (createdEvent) => {
        this.isLoading = false;
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
    this.router.navigate(['/my-events']);
  }
}
