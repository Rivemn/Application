import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventDto } from '../../models/EventDto';
import { EventFormData } from '../../models/EventFormData';
import { UpdateEventDto } from '../../models/UpdateEventDto';

@Component({
  selector: 'app-edit-event',
  standalone: false,
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.scss',
})
export class EditEvent {
  isLoading = true;
  errorMessage: string | null = null;
  private eventId!: string;
  eventData: EventDto | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Event ID not found.';
      this.isLoading = false;
      return;
    }
    this.eventId = id;
    this.loadEventData();
  }

  loadEventData(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.eventData = event;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load event data.';
        this.isLoading = false;
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }

  handleFormSubmit(formData: EventFormData): void {
    this.isLoading = true;
    this.errorMessage = null;

    const updateData: UpdateEventDto = { ...formData };

    this.eventService.updateEvent(this.eventId, updateData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Event updated successfully!');
        this.router.navigate(['/my-events']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'An unexpected error occurred.';
        console.error('Event update failed', err);
        // Здесь можно добавить cdr.markForCheck(), если используете OnPush
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/my-events']);
  }
}
