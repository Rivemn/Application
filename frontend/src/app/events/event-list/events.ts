import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventDto } from '../../models/EventDto';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TagDto } from '../../models/TagDto';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  public allEvents: EventDto[] = [];
  public events: EventDto[] = [];
  public isLoading = true;
  public error: string | null = null;
  public searchTerm: string = '';
  public allTags: TagDto[] = [];
  public selectedTagIds: string[] = [];

  public currentUserId: string | null = null;
  private authSubscription: Subscription | undefined;

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user: DecodedToken | null) => {
        this.currentUserId = user ? user.sub : null;
        this.loadEvents(); // Завантажуємо події *після* отримання ID користувача
        // this.cdr.markForCheck(); // loadEvents сам викличе markForCheck
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  public isOrganizer(event: EventDto): boolean {
    return this.currentUserId != null && event.organizerId === this.currentUserId;
  }

  public isParticipant(event: EventDto): boolean {
    if (!this.currentUserId || !event.participantIds) {
      return false;
    }
    return event.participantIds.includes(this.currentUserId);
  }

  loadEvents(): void {
    this.isLoading = true;
    this.error = null;

    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.allEvents = data;
        this.events = [...data];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load events. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onSearchChange(): void {
    const filterValue = this.searchTerm.toLowerCase();
    this.events = this.allEvents.filter((event) => event.title.toLowerCase().includes(filterValue));
  }

  // Допоміжний метод для клієнтської фільтрації
  private applyClientFilters(): void {
    const filterValue = this.searchTerm.toLowerCase();
    this.events = this.allEvents.filter((event) => event.title.toLowerCase().includes(filterValue));
    // this.cdr.markForCheck(); // onSearchChange вже не асинхронна,
    // але якщо searchTerm через [(ngModel)], то краще залишити
  }

  onTagFilterChange(): void {
    this.loadEvents(); // Перезавантажуємо події з бекенду
  }

  onJoinEvent(eventId: string): void {
    const event = this.findEventById(eventId);
    if (!event) return;

    this.eventService.joinEvent(eventId).subscribe({
      next: () => {
        event.participantsCount++;
        if (this.currentUserId) {
          event.participantIds.push(this.currentUserId);
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        alert(`Error: ${err.error?.error || 'Could not join the event.'}`);
      },
    });
  }
  onLeaveEvent(eventId: string): void {
    const event = this.findEventById(eventId);
    if (!event) return;

    this.eventService.leaveEvent(eventId).subscribe({
      next: () => {
        event.participantsCount--;
        if (this.currentUserId) {
          const index = event.participantIds.indexOf(this.currentUserId);
          if (index > -1) {
            event.participantIds.splice(index, 1);
          }
        }
        this.cdr.markForCheck();
        alert(`You have left the event "${event.title}".`);
      },
      error: (err) => {
        alert(`Error: ${err.error?.error || 'Could not leave the event.'}`);
      },
    });
  }
  private findEventById(eventId: string): EventDto | undefined {
    let event = this.events.find((e) => e.id === eventId);
    if (!event) {
      event = this.allEvents.find((e) => e.id === eventId);
    }
    return event;
  }
}
