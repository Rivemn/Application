import { Component, signal } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
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
  years = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - 10 + i
  );

  selectedDay = signal<number>(15);
  selectedMonth = signal<string>('May');
  selectedYear = signal<number>(new Date().getFullYear());

  getFormattedDate(): string {
    return `${this.selectedMonth()} ${this.selectedDay()}, ${this.selectedYear()}`;
  }
}
