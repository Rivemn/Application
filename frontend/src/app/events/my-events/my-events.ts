import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { EventDto } from '../../models/EventDto';
import { TagDto } from '../../models/TagDto';

import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { EventService } from '../services/event.service';
import { TagService } from '../services/tag.service';
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
export class MyEvents implements OnInit, OnDestroy {
  public allMyEvents: EventDto[] = [];
  public calendarEvents: CalendarEvent[] = [];
  public eventsForSelectedDay: EventDto[] = [];
  public selectedDate: Date = new Date();
  public isLoading = true;
  public error: string | null = null;
  public currentUserId: string | null = null;

  public allTags: TagDto[] = [];

  private authSubscription: Subscription | undefined;

  constructor(
    private eventService: EventService,
    private tagService: TagService,

    private store: Store<AuthState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectedDate.setHours(0, 0, 0, 0);

    this.authSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user: DecodedToken | null) => {
        this.currentUserId = user ? user.sub : null;

        this.loadInitialData();

        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.error = null;
    this.cdr.markForCheck();

    // Переконуємося, що в нас є користувач, перш ніж запитувати його події
    if (!this.currentUserId) {
      this.isLoading = false;
      this.error = 'Please log in to see your events.';
      this.cdr.markForCheck();
      return;
    }

    // Використовуємо Promise.all для паралельного завантаження
    Promise.all([
      // getMyEvents() тепер неявно використовує ID користувача з токена (через Interceptor)
      firstValueFrom(this.eventService.getMyEvents()),
      firstValueFrom(this.tagService.getAllTags()),
    ])
      .then(([eventsData, tagsData]) => {
        // Обробка подій
        this.allMyEvents = eventsData;
        this.calendarEvents = this.allMyEvents.map((event) => ({
          title: event.title,
          date: new Date(event.start),
        }));
        this.filterEventsForDate(this.selectedDate);

        // Обробка тегів
        this.allTags = tagsData;

        // Завершення
        this.isLoading = false;
        this.cdr.markForCheck();
      })
      .catch((err) => {
        console.error('Failed to load initial data for MyEvents', err);
        this.error = 'Could not load your events or tags. Please try again.';
        this.isLoading = false;
        this.cdr.markForCheck();
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
