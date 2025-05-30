import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DropdownComponent, ReactiveFormsModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  form: FormGroup;

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
  years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      day: [15],
      month: ['May'],
      year: [new Date().getFullYear()],
    });
  }

  getFormattedDate(): string {
    const { day, month, year } = this.form.value;
    return `${month} ${day}, ${year}`;
  }
}
