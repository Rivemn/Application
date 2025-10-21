import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
export interface CalendarEvent {
  date: Date;
  title: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
}
@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  @Input() events: CalendarEvent[] = [];
  @Output() dateSelected = new EventEmitter<Date>();

  public currentDate: Date = new Date(); // This now controls the displayed month
  public monthName = '';
  public year = 0;
  public weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  public weeks: (Date | null)[][] = [];
  public selectedDay: Date = new Date();

  // A fast way to check if a day has an event
  private eventDates = new Set<string>();

  ngOnInit(): void {
    this.selectedDay.setHours(0, 0, 0, 0);
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.updateEventSet();
      this.generateCalendar();
    }
  }

  private updateEventSet(): void {
    this.eventDates.clear();
    this.events.forEach((event) => {
      this.eventDates.add(this.formatDateKey(new Date(event.date)));
    });
  }

  private generateCalendar(): void {
    this.monthName = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear();

    const firstDayOfMonth = new Date(this.year, this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.year, this.currentDate.getMonth() + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

    this.weeks = [];
    let currentWeek: (Date | null)[] = [];
    let currentDateIterator = new Date(startDate);

    while (currentDateIterator <= endDate) {
      if (currentDateIterator.getMonth() === this.currentDate.getMonth()) {
        currentWeek.push(new Date(currentDateIterator));
      } else {
        currentWeek.push(null);
      }

      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }
  }

  public previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  public selectDay(day: Date | null): void {
    if (day) {
      this.selectedDay = day;
      this.dateSelected.emit(day);
    }
  }

  public isToday(day: Date | null): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }

  public isSelected(day: Date | null): boolean {
    if (!day) return false;
    return day.getTime() === this.selectedDay.getTime();
  }

  public hasEvent(day: Date | null): boolean {
    if (!day) return false;
    return this.eventDates.has(this.formatDateKey(day));
  }

  private formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
