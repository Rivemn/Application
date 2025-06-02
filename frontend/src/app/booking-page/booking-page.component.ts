import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { WorkspaceService } from '../services/workspace.service';
import { Observable } from 'rxjs';
import { Workspace } from '../contracts/Workspace';
import { AviabilityService } from '../services/availability.service';
import { Aviability } from '../contracts/Aviability';
import { BookingConfirmationComponent } from '../shared/booking-confirmation/booking-confirmation.component';
import { Booking } from '../contracts/Booking';
import { BookingRequest } from '../contracts/BookingRequest';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    BookingConfirmationComponent,
  ],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  form: FormGroup;
  openDropdown: string | null = null;
  showConfirmation = false;

  workspaceOptions$: Observable<Workspace[]>;

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
  years = Array.from({ length: 20 }, (_, i) => 2025 + i); // Starting from 2025

  constructor(
    private fb: FormBuilder,
    private workspaceService: WorkspaceService,
    private aviabilityService: AviabilityService,
    private bookingService: BookingService
  ) {
    const currentYear = 2025; // Set to current year (June 02, 2025)
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        room: [null, Validators.required],
        roomSize: [null, Validators.required],
        dateStart: [
          {
            day: null,
            month: null,
            year: currentYear,
          },
          Validators.required,
        ],
        dateEnd: [
          {
            day: null,
            month: null,
            year: currentYear,
          },
          Validators.required,
        ],
        timeStart: [null, Validators.required],
        timeEnd: [null, Validators.required],
      },
      {
        validators: this.dateRangeValidator,
      }
    );

    this.workspaceOptions$ = this.workspaceService.getAll();
  }

  toggleDropdown(name: string) {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  closeDropdown(name: string) {
    if (this.openDropdown === name) {
      this.openDropdown = null;
    }
  }

  aviabilities: Aviability[] = [];

  selectRoom(room: Workspace) {
    this.form.get('room')?.setValue(room);
    this.openDropdown = null;

    this.aviabilityService.getByWorkspaceId(room.id).subscribe({
      next: (data) => {
        this.aviabilities = data;
        console.log('Aviabilities loaded:', data);
      },
      error: (err) => {
        console.error('Failed to load aviabilities', err);
      },
    });
  }

  selectDatePart(controlName: string, part: string, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const current = this.form.get(controlName)?.value || {};
    const updated = { ...current, [part]: parseInt(value, 10) };

    this.form.get(controlName)?.setValue(updated);
    this.form.get(controlName)?.markAsTouched();
    this.form.updateValueAndValidity();
  }

  selectTime(controlName: string, time: string) {
    this.form.get(controlName)?.setValue(time);
    this.form.get(controlName)?.markAsTouched();
    this.form.updateValueAndValidity();
    this.openDropdown = null;
  }

  dateRangeValidator(form: FormGroup): { [key: string]: any } | null {
    const dateStart = form.get('dateStart')?.value;
    const dateEnd = form.get('dateEnd')?.value;
    const timeStart = form.get('timeStart')?.value;
    const timeEnd = form.get('timeEnd')?.value;

    if (
      !dateStart?.day ||
      !dateStart?.month ||
      !dateStart?.year ||
      !dateEnd?.day ||
      !dateEnd?.month ||
      !dateEnd?.year
    ) {
      return {
        incompleteDate: 'All date fields (day, month, year) are required',
      };
    }

    if (timeStart && timeEnd) {
      const startDate = new Date(
        dateStart.year,
        dateStart.month - 1,
        dateStart.day
      );
      const endDate = new Date(dateEnd.year, dateEnd.month - 1, dateEnd.day);

      const [startTimeStr, startPeriod] = timeStart.split(' ');
      let [startHours, startMinutes] = startTimeStr.split(':').map(Number);
      if (startPeriod === 'PM' && startHours !== 12) startHours += 12;
      if (startPeriod === 'AM' && startHours === 12) startHours = 0;
      startDate.setHours(startHours, startMinutes);

      const [endTimeStr, endPeriod] = timeEnd.split(' ');
      let [endHours, endMinutes] = endTimeStr.split(':').map(Number);
      if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
      if (endPeriod === 'AM' && endHours === 12) endHours = 0;
      endDate.setHours(endHours, endMinutes);

      if (endDate <= startDate) {
        return { invalidTimeRange: 'End time must be after start time' };
      }

      const diffInMs = endDate.getTime() - startDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      if (diffInDays > 30) {
        return { maxDurationExceeded: 'Booking cannot exceed 30 days' };
      }
    }

    return null;
  }

  booking!: BookingRequest;

  submit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const startDate = new Date(
        formValue.dateStart.year,
        formValue.dateStart.month - 1,
        formValue.dateStart.day
      );
      const [startTime, period] = formValue.timeStart.split(' ');
      let [hours, minutes] = startTime.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      startDate.setHours(hours, minutes);

      const endDate = new Date(
        formValue.dateEnd.year,
        formValue.dateEnd.month - 1,
        formValue.dateEnd.day
      );
      const [endTime, endPeriod] = formValue.timeEnd.split(' ');
      let [endHours, endMinutes] = endTime.split(':').map(Number);
      if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
      if (endPeriod === 'AM' && endHours === 12) endHours = 0;
      endDate.setHours(endHours, endMinutes);

      this.booking = {
        workspaceId: formValue.room.id,
        fullName: formValue.name,
        email: formValue.email,
        aviabilityId: formValue.roomSize.id,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };

      console.log(this.booking);

      this.bookingService.create(this.booking).subscribe({
        next: (id) => {
          console.log('Booking successfully created with id:', id);
          this.showConfirmation = true;
          this.form.reset();
        },
        error: (err) => {
          console.error('Booking failed:', err);
        },
      });
    } else {
      this.form.markAllAsTouched();
      console.warn('Form invalid:', this.form.errors);
    }
  }
}
