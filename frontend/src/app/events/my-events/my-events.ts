import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventDto } from '../../models/EventDto';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { AuthState } from '../../store/auth/auth.state';

interface CalendarEvent {
  date: Date;
  title: string;
}

@Component({
  selector: 'app-my-events',
  standalone: false,
  templateUrl: './my-events.html',
  styleUrls: ['./my-events.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyEvents implements OnInit {
  public allMyEvents: EventDto[] = [];
  public calendarEvents: CalendarEvent[] = [];
  public eventsForSelectedDay: EventDto[] = [];
  public selectedDate: Date = new Date();
  public isLoading = true;
  public error: string | null = null;
  public currentUserId: string | null = null;

  private authSubscription: Subscription | undefined;

  constructor(
    private eventService: EventService,

    private cdr: ChangeDetectorRef,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.selectedDate.setHours(0, 0, 0, 0);

    this.authSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user: DecodedToken | null) => {
        this.currentUserId = user ? user.sub : null;
      });
    // ---------------------------------------------

    this.loadMyEvents();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  loadMyEvents(): void {
    this.isLoading = true;
    this.error = null;

    this.eventService.getMyEvents().subscribe({
      next: (data) => {
        this.allMyEvents = data;
        this.calendarEvents = this.allMyEvents.map((event) => ({
          title: event.title,
          date: new Date(event.start),
        }));
        this.filterEventsForDate(this.selectedDate);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load my events', err);
        this.error = 'Could not load your events. Please try again.';
        this.isLoading = false;
        this.cdr.markForCheck();
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
  public isOrganizer(event: EventDto): boolean {
    return this.currentUserId != null && event.organizerId === this.currentUserId;
  }
}
