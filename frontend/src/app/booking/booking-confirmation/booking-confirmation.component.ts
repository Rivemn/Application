// src/app/booking/booking-confirmation/booking-confirmation.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BookingRequest } from '../../contracts/BookingRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-confirmation',
  standalone: false,
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss'],
})
export class BookingConfirmationComponent implements OnChanges {
  @Input() booking: BookingRequest | null = null;
  @Input() isError: boolean = false;
  @Input() errorMessage: string =
    'Selected time is not available. Please choose a different time slot.';
  @Output() close = new EventEmitter<void>();

  title: string = '';
  icon: string = '';
  buttonText: string = '';
  showMyBookings: boolean = false;

  constructor(private router: Router) {}

  ngOnChanges() {
    if (this.isError) {
      this.title = 'Time Slot Unavailable';
      this.icon = 'x.png';
      this.buttonText = 'Choose Another Time';
      this.showMyBookings = false;
    } else if (this.booking) {
      this.title = "You're All Set!";
      this.icon = 'done.svg';
      this.buttonText = 'My Bookings';
      this.showMyBookings = true;
    } else {
      this.title = 'Booking Information';
      this.icon = 'info.svg';
      this.buttonText = 'Close';
      this.showMyBookings = false;
    }
  }

  goToMyBookings() {
    this.router.navigate(['/my-bookings']);
    this.close.emit();
  }

  closeModal() {
    this.close.emit();
  }
}
