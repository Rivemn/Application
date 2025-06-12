import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  filter,
  map,
  Observable,
  take,
  combineLatest,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { Workspace } from '../../contracts/Workspace';
import { Availability } from '../../contracts/Availability';
import { BookingRequest } from '../../contracts/BookingRequest';
import * as BookingActions from '../../store/booking/booking.actions';
import * as WorkspaceActions from '../../store/workspace/workspace.actions';
import * as AvailabilityActions from '../../store/availability/availability.actions';
import {
  selectAllAvailabilities,
  selectAvailabilityLoading,
  selectAvailabilityError,
} from '../../store/availability/availability.selectors';
import {
  selectBookingId,
  selectBookingError,
  selectBookingLoading,
} from '../../store/booking/booking.selectors';
import {
  selectWorkspacesByCoworking,
  selectWorkspacesByCoworkingLoading,
  selectWorkspacesByCoworkingError,
} from '../../store/workspace/workspaces.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  standalone: false,
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent implements OnInit {
  form: FormGroup;

  openDropdown: string | null = null;
  showConfirmation = false;
  bookingData: BookingRequest | null = null;
  conflictError: string = '';
  isError: boolean = false;
  coworkingId!: string;

  workspaceOptions$: Observable<Workspace[]>;
  availabilities$: Observable<Availability[]>;
  workspaceLoading$: Observable<boolean>;
  availabilityLoading$: Observable<boolean>;
  workspaceError$: Observable<string | null>;
  availabilityError$: Observable<string | null>;
  bookingId$: Observable<string | null>;
  bookingError$: Observable<string | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

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
  years = Array.from({ length: 20 }, (_, i) => 2025 + i);

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    const currentYear = 2025;
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        room: [null, Validators.required],
        roomSize: [null, Validators.required],
        dateStart: [
          { day: null, month: null, year: currentYear },
          Validators.required,
        ],
        dateEnd: [
          { day: null, month: null, year: currentYear },
          Validators.required,
        ],
        timeStart: [null, Validators.required],
        timeEnd: [null, Validators.required],
      },
      { validators: [this.dateRangeValidator, this.roomSizeValidator] }
    );

    // Initialize observables
    this.workspaceOptions$ = this.store.select(selectWorkspacesByCoworking);
    this.availabilities$ = of([]);
    this.workspaceLoading$ = this.store.select(
      selectWorkspacesByCoworkingLoading
    );
    this.availabilityLoading$ = this.store.select(selectAvailabilityLoading);
    this.workspaceError$ = this.store.select(selectWorkspacesByCoworkingError);
    this.availabilityError$ = this.store.select(selectAvailabilityError);
    this.bookingId$ = this.store.select(selectBookingId);
    this.bookingError$ = this.store.select(selectBookingError);

    // Combine loading states
    this.loading$ = combineLatest([
      this.workspaceLoading$,
      this.availabilityLoading$,
      this.store.select(selectBookingLoading),
    ]).pipe(
      map(
        ([workspaceLoading, availabilityLoading, bookingLoading]) =>
          workspaceLoading || availabilityLoading || bookingLoading
      )
    );

    // Combine error states
    this.error$ = combineLatest([
      this.workspaceError$,
      this.availabilityError$,
      this.bookingError$,
    ]).pipe(
      map(
        ([workspaceError, availabilityError, bookingError]) =>
          workspaceError || availabilityError || bookingError
      )
    );

    // Reset roomSize when room changes
    this.form
      .get('room')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.get('roomSize')?.reset();
        this.form.get('roomSize')?.markAsUntouched();
        this.cdr.detectChanges();
      });
  }

  ngOnInit() {
    // Extract coworkingId from route
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.coworkingId = params.get('coworkingId') || '';
      if (this.coworkingId) {
        this.store.dispatch(
          WorkspaceActions.loadWorkspacesByCoworking({
            coworkingId: this.coworkingId,
          })
        );
      } else {
        this.conflictError = 'Invalid coworking ID';
        this.isError = true;
        this.showConfirmation = true;
        this.cdr.detectChanges();
      }
    });

    // Handle booking success and errors
    combineLatest([this.bookingId$, this.bookingError$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([bookingId, error]) => {
        if (bookingId) {
          this.isError = false;
          this.conflictError = '';
        } else if (error) {
          this.isError = true;
          this.conflictError = error.includes('time slot')
            ? 'Selected time is not available. Please choose a different time slot.'
            : 'Failed to create booking. Please try again.';
        }
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDropdown(name: string) {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  closeDropdown(name: string) {
    if (this.openDropdown === name) {
      this.openDropdown = null;
    }
  }

  selectRoom(room: Workspace) {
    this.form.get('room')?.setValue(room);
    this.openDropdown = null;
    this.store.dispatch(
      AvailabilityActions.loadAvailabilitiesByWorkspace({
        workspaceId: room.id,
      })
    );
    this.availabilities$ = this.store
      .select(selectAllAvailabilities)
      .pipe(
        map((availabilities) =>
          availabilities.filter((a) => a.workspaceId === room.id)
        )
      );
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

  roomSizeValidator(form: FormGroup): { [key: string]: any } | null {
    const room = form.get('room')?.value;
    const roomSize = form.get('roomSize')?.value;

    if (room && roomSize && roomSize?.workspaceId !== room.id) {
      return {
        invalidRoomSize:
          'Selected room size does not match the selected workspace',
      };
    }

    return null;
  }

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

      this.bookingData = {
        workspaceId: formValue.room.id,
        fullName: formValue.name,
        email: formValue.email,
        availabilityId: formValue.roomSize.id,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };

      console.log('Submitting booking:', this.bookingData);
      this.store.dispatch(
        BookingActions.createBooking({ request: this.bookingData })
      );
      this.showConfirmation = true; // Always show confirmation
      this.cdr.detectChanges();
    } else {
      this.form.markAllAsTouched();
      console.log('Form is invalid:', this.form.errors);
    }
  }

  closeConfirmation() {
    this.showConfirmation = false;
    this.conflictError = '';
    this.isError = false;
    this.bookingData = null;
    this.form.reset();
    this.availabilities$ = of([]);
    this.store.dispatch(BookingActions.resetBooking());
    this.cdr.detectChanges();
  }
}
