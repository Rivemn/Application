import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
})
export class BookingPageComponent {
  form: FormGroup;
  openDropdown: string | null = null;

  roomOptions = [
    { id: 1, name: 'Room for 1 person' },
    { id: 2, name: 'Room for 2 people' },
    { id: 3, name: 'Room for 5 people' },
    { id: 4, name: 'Room for 10 people' },
    { id: 5, name: 'Room for 15 people' },
    { id: 6, name: 'Room for 20 people' },
    { id: 7, name: 'Room for 25 people' },
  ];

  timeOptions = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
  ];

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
    const today = new Date(2025, 4, 30); // May 30, 2025 (04:44 PM EEST)
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      room: [null, Validators.required],
      roomSize: [null, Validators.required],
      dateStart: [
        {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        Validators.required,
      ],
      dateEnd: [
        {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        },
        Validators.required,
      ],
      timeStart: [null, Validators.required],
      timeEnd: [null, Validators.required],
    });
  }

  toggleDropdown(dropdownName: string) {
    this.openDropdown =
      this.openDropdown === dropdownName ? null : dropdownName;
  }

  closeDropdown(dropdownName: string) {
    if (this.openDropdown === dropdownName) {
      this.openDropdown = null;
    }
  }

  selectRoom(room: any) {
    this.form.get('room')?.setValue(room);
    this.openDropdown = null;
  }

  selectDatePart(controlName: string, part: string, event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (!target) return;

    const value = target.value;
    const currentDate = this.form.get(controlName)?.value || {};
    const updatedDate = { ...currentDate, [part]: value };

    const day = parseInt(updatedDate.day) || 0;
    const month = parseInt(updatedDate.month) || 0;
    const year = parseInt(updatedDate.year) || 0;

    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      ) {
        this.form.get(controlName)?.setValue(updatedDate);
      } else {
        this.form.get(controlName)?.setValue({ ...updatedDate, day: null });
      }
    } else {
      this.form.get(controlName)?.setValue(updatedDate);
    }
  }

  selectTime(controlName: string, time: string) {
    this.form.get(controlName)?.setValue(time);
    this.openDropdown = null;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Add submission logic here
    }
  }
}
