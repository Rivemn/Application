import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  // --- Входящие данные ---
  @Input() events: CalendarEvent[] = [];

  // --- Исходящие события ---
  @Output() dateSelected = new EventEmitter<Date>();

  // --- Внутреннее состояние компонента ---
  public viewMode: 'month' | 'week' = 'month';
  public currentDate: Date = new Date();
  public selectedDate: Date = new Date();
  public monthDays: CalendarDay[][] = [];
  public weekDays: CalendarDay[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  // Вся логика генерации календаря (generateCalendar, generateMonthView, и т.д.)
  // остается здесь, как в предыдущем ответе.
  // ... (generateCalendar, generateMonthView, generateWeekView, etc.) ...

  private generateCalendar(): void {
    this.generateMonthView(this.currentDate);
    this.generateWeekView(this.currentDate);
  }
  private generateMonthView(date: Date): void {
    this.monthDays = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    let startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
    let week: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      if (i > 0 && i % 7 === 0) {
        this.monthDays.push(week);
        week = [];
      }
      const dayDate = new Date(startDate);
      week.push({
        date: dayDate,
        isCurrentMonth: dayDate.getMonth() === month,
        isSelected: this.isSameDay(dayDate, this.selectedDate),
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    if (week.length > 0) {
      this.monthDays.push(week);
    }
  }
  private generateWeekView(date: Date): void {
    this.weekDays = [];
    let startDate = new Date(date);
    startDate.setDate(startDate.getDate() - date.getDay());
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startDate);
      this.weekDays.push({
        date: dayDate,
        isCurrentMonth: true,
        isSelected: this.isSameDay(dayDate, this.selectedDate),
      });
      startDate.setDate(startDate.getDate() + 1);
    }
  }
  public onDayClick(day: CalendarDay): void {
    this.selectedDate = day.date;
    this.currentDate = day.date;
    this.generateCalendar();
    this.dateSelected.emit(day.date); // Уведомляем родителя
  }
  public navigate(amount: number): void {
    if (this.viewMode === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() + amount);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + 7 * amount);
    }
    this.generateCalendar();
  }
  public setViewMode(mode: 'month' | 'week'): void {
    this.viewMode = mode;
    this.currentDate = new Date(this.selectedDate);
    this.generateCalendar();
  }
  public getEventForDate(date: Date): CalendarEvent | undefined {
    return this.events.find((event) => this.isSameDay(event.date, date));
  }
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }
  public isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }
}
