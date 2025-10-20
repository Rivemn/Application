import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from '../services/EventService';
import { EventDto } from '../models/EventDto';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private allEvents: EventDto[] = [];

  public events: EventDto[] = [];

  public isLoading = true;
  public error: string | null = null;
  public searchTerm: string = '';
  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.error = null;

    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.allEvents = data; // <— сохраняем оригинальные данные
        this.events = [...data]; // <— копируем их для отображения
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load events', err);
        this.error = 'Failed to load events. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onSearchChange(): void {
    const filterValue = this.searchTerm.toLowerCase();

    this.events = this.allEvents.filter((event) => event.title.toLowerCase().includes(filterValue));
  }

  onJoinEvent(eventId: string): void {
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return;

    this.eventService.joinEvent(eventId).subscribe({
      next: () => {
        event.participantsCount++;
        alert(`Successfully joined "${event.title}"!`);
      },
      error: (err) => {
        console.error('Failed to join event', err);
        alert(`Error: ${err.error?.error || 'Could not join the event.'}`);
      },
    });
  }
}
