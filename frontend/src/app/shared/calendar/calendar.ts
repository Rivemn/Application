import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
export interface CalendarEvent {
  date: Date;
  title: string;
}

interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasEvents: boolean;
}
@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  @Input() events: CalendarEvent[] = []; // Список подій
  @Output() dateSelected = new EventEmitter<Date>(); // Подія при виборі дати

  public currentDate: Date = new Date(); // Поточна дата для відображення місяця
  public selectedDate: Date = new Date(); // Вибрана дата
  public daysInMonth: CalendarDay[] = []; // Масив днів для відображення
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit(): void {
    // Встановлюємо вибрану дату на початок дня (без часу)
    this.selectedDate.setHours(0, 0, 0, 0);
    this.generateCalendar();
  }

  // Відстежуємо зміни у вхідному масиві подій
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && !changes['events'].firstChange) {
      this.generateCalendar();
    }
  }

  generateCalendar(): void {
    this.daysInMonth = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon, ...
    const totalDays = lastDayOfMonth.getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Додаємо дні попереднього місяця
    for (let i = 0; i < firstDayWeekday; i++) {
      const date = new Date(year, month, 1 - (firstDayWeekday - i));
      date.setHours(0, 0, 0, 0); // Нормалізуємо дату
      this.daysInMonth.push({
        date: date,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasEvents: this.isEventDay(date), // Перевіряємо наявність подій
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      const isSelectedDay = date.getTime() === this.selectedDate.getTime();
      this.daysInMonth.push({
        date: date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
        isSelected: isSelectedDay,
        hasEvents: this.isEventDay(date),
      });
    }

    const gridsize = this.daysInMonth.length > 35 ? 42 : 35;
    const remainingDays = gridsize - this.daysInMonth.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      date.setHours(0, 0, 0, 0);
      this.daysInMonth.push({
        date: date,
        dayOfMonth: i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        hasEvents: this.isEventDay(date),
      });
    }
    console.log('Calendar generated for:', this.currentDate.toDateString(), this.daysInMonth); // Додано для відладки
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  goToToday(): void {
    this.currentDate = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.selectDate(today);
  }

  selectDate(date: Date): void {
    this.selectedDate = new Date(date);
    this.selectedDate.setHours(0, 0, 0, 0);
    this.dateSelected.emit(this.selectedDate);

    this.generateCalendar();
  }

  isEventDay(date: Date): boolean {
    const targetTime = date.getTime();
    return this.events.some((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === targetTime;
    });
  }
}
