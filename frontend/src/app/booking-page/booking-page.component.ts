import { Component } from '@angular/core';
import { DatepickerComponent } from '../../shared/datepicker/datepicker.component';
import { TimePickerComponent } from '../../shared/time-picker/time-picker.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-booking-page',
  imports: [DatepickerComponent, TimePickerComponent, DropdownComponent],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
})
export class BookingPageComponent {}
