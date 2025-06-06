import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { WorkspaceService } from '../../services/workspace.service';
import { Booking } from '../../contracts/Booking';
import { Workspace } from '../../contracts/Workspace';
import { forkJoin, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as BookingActions from '../../store/booking/booking.actions';
import {
  selectAllBookings,
  selectBookingLoading,
  selectBookingError,
  selectWorkspaces,
} from '../../store/booking/booking.selectors';

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings$: Observable<Booking[]>;
  workspacesMap: { [workspaceId: string]: Workspace } = {};
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private router: Router, private store: Store) {
    this.bookings$ = this.store.select(selectAllBookings);
    this.loading$ = this.store.select(selectBookingLoading);
    this.error$ = this.store.select(selectBookingError);
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.store.dispatch(BookingActions.loadBookingsByUserEmail({ email }));
      this.store.dispatch(BookingActions.loadWorkspaces());
    } else {
      console.error('No email found in localStorage');
      this.router.navigate(['/login']);
    }

    this.store.select(selectWorkspaces).subscribe((workspaces) => {
      this.workspacesMap = workspaces.reduce(
        (map, ws) => ({ ...map, [ws.id]: ws }),
        {}
      );
      console.log('Workspaces updated:', this.workspacesMap);
    });

    this.error$.subscribe((error) => {
      if (error) {
        console.error('Booking error:', error);
      }
    });
  }

  goToCoworking() {
    this.router.navigate(['/coworking']);
  }

  deleteBooking(bookingId: string) {
    this.store.dispatch(BookingActions.deleteBooking({ id: bookingId }));
  }

  calculateDays(start: string | Date, end: string | Date): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date:', start, end);
      return 0;
    }
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
