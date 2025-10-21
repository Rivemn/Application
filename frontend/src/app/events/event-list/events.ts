import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/EventService';
import { EventDto } from '../../models/EventDto';
import { AuthService } from '../../core/services/AuthService';
import { Subscription } from 'rxjs';

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

  public currentUserId: string | null = null;
  private authSubscription: Subscription | undefined;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Подписываемся на изменения пользователя, чтобы всегда иметь актуальный ID
    this.authSubscription = this.authService.currentUser$.subscribe((user: DecodedToken | null) => {
      this.currentUserId = user ? user.sub : null;
      // Загружаем события только после того, как получили информацию о пользователе
      this.loadEvents();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Отписываемся при уничтожении компонента, чтобы избежать утечек памяти
    this.authSubscription?.unsubscribe();
  }

  // Метод-помощник для проверки, является ли текущий пользователь организатором
  public isOrganizer(event: EventDto): boolean {
    return this.currentUserId != null && event.organizerId === this.currentUserId;
  }

  // Метод-помощник для проверки, участвует ли текущий пользователь в событии
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
