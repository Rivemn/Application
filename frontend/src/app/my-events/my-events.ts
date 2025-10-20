import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/EventService';
import { EventDto } from '../models/EventDto';

// This is the data structure your calendar component expects.
interface CalendarEvent {
  date: Date;
  title: string;
}

@Component({
  selector: 'app-my-events',
  standalone: false,
  templateUrl: './my-events.html',
  styleUrls: ['./my-events.scss'],
})
export class MyEvents implements OnInit {
  // Stores the original, unmodified data from the backend
  public allMyEvents: EventDto[] = [];

  // This new array will hold the transformed data for the calendar
  public calendarEvents: CalendarEvent[] = [];

  // Stores events filtered for the currently selected day to display in the agenda
  public eventsForSelectedDay: EventDto[] = [];
  public selectedDate: Date = new Date();

  public isLoading = true;
  public error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.selectedDate.setHours(0, 0, 0, 0);
    this.loadMyEvents();
  }

  loadMyEvents(): void {
    this.isLoading = true;
    this.error = null;

    this.eventService.getMyEvents().subscribe({
      next: (data) => {
        this.allMyEvents = data;

        // Transform the backend data into the format the calendar needs.
        // We map each EventDto to a CalendarEvent, renaming 'start' to 'date'.
        this.calendarEvents = this.allMyEvents.map((event) => ({
          title: event.title,
          date: new Date(event.start), // Ensure 'start' is a Date object
        }));

        this.filterEventsForDate(this.selectedDate);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load my events', err);
        this.error = 'Could not load your events. Please try again.';
        this.isLoading = false;
      },
    });
  }

  public onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.filterEventsForDate(date);
  }

  private filterEventsForDate(date: Date): void {
    this.eventsForSelectedDay = this.allMyEvents.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }
}
