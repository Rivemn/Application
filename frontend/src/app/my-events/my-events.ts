import { Component, ViewEncapsulation } from '@angular/core';
interface CalendarEvent {
  date: Date;
  title: string;
}
interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean; // Является ли день частью текущего месяца (для серого цвета)
  isSelected: boolean;
}
@Component({
  selector: 'app-my-events',
  standalone: false,
  templateUrl: './my-events.html',
  styleUrl: './my-events.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MyEvents {
  // Компонент теперь отвечает только за данные
  public events: CalendarEvent[] = [
    { date: new Date('2025-10-08'), title: 'AI Conference' },
    { date: new Date(), title: "Today's Meeting" },
  ];

  constructor() {}

  // Обработчик события от дочернего календаря
  public onDateSelected(date: Date): void {
    console.log('Date selected in parent component:', date);
    // Здесь вы можете реализовать логику загрузки событий для выбранной даты
  }
}
