import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Booking } from '../../contracts/Booking';
import { Workspace } from '../../contracts/Workspace';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as BookingActions from '../../store/booking/booking.actions';
import * as WorkspaceActions from '../../store/workspace/workspace.actions';
import { selectAllBookings } from '../../store/booking/booking.selectors';
import { selectWorkspaceState } from '../../store/workspace/workspaces.selectors';

interface BookingDetails {
  booking: Booking;
  workspace?: Workspace;
}

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings$: Observable<BookingDetails[]>;

  constructor(private router: Router, private store: Store) {
    const bookings$ = this.store.select(selectAllBookings);
    const workspaceState$ = this.store.select(selectWorkspaceState);

    this.bookings$ = combineLatest([bookings$, workspaceState$]).pipe(
      map(([bookings, workspaceState]) =>
        bookings.map((booking) => {
          const workspace = workspaceState.workspaces.find(
            (w) => w.id === booking.workspaceId
          );
          return { booking, workspace };
        })
      )
    );
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.store.dispatch(BookingActions.loadBookingsByUserEmail({ email }));

      this.store.select(selectAllBookings).subscribe((bookings) => {
        const workspaceIds = [...new Set(bookings.map((b) => b.workspaceId))];
        workspaceIds.forEach((id) => {
          this.store.dispatch(WorkspaceActions.loadWorkspaceById({ id }));
        });
      });

      this.bookings$.subscribe((bookingDetails) => {
        bookingDetails.forEach((item) => {
          if (item.workspace) {
            console.log('Workspace Name:', item.workspace.name);
            console.log('Workspace Model:', item.workspace);
          } else {
            console.log('Workspace not loaded for booking:', item.booking.id);
          }
        });
      });
    } else {
      console.error('No email found in localStorage');
      this.router.navigate(['/login']);
    }
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

  trackById(index: number, item: BookingDetails): string {
    return item.booking.id;
  }
}
