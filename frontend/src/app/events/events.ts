import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/EventService';
import { EventDto } from '../models/EventDto';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  public events: EventDto[] = [];
  public isLoading = true;
  public error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.error = null;

    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load events', err);
        this.error = 'Failed to load events. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
