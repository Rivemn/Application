import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingRequest } from '../../contracts/BookingRequest';
@Component({
  selector: 'app-booking-confirmation',
  imports: [CommonModule],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.scss',
})
export class BookingConfirmationComponent {
  @Input()
  booking!: BookingRequest;

  constructor(private router: Router) {}

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  goToMyBookings() {
    this.router.navigate(['/my-bookings']);
  }

  closeModal() {
    this.close.emit();
  }
}
