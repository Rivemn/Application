import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { WorkspaceService } from '../services/workspace.service';
import { Booking } from '../contracts/Booking';
import { Workspace } from '../contracts/Workspace';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  workspacesMap: { [workspaceId: string]: Workspace } = {};

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.bookingService.getByUser(userId).subscribe((bookings) => {
        this.bookings = bookings;
        const workspaceIds = Array.from(
          new Set(bookings.map((b) => b.workspaceId))
        );
        forkJoin(
          workspaceIds.map((id) => this.workspaceService.getById(id))
        ).subscribe((workspaces) => {
          workspaces.forEach((ws) => {
            this.workspacesMap[ws.id] = ws; // Без додавання полів для фото
          });
        });
      });
    }
  }

  goToCoworking() {
    this.router.navigate(['/coworking']);
  }

  deleteBooking(bookingId: string) {
    console.log('Deleting booking with ID:', bookingId); // <-- добавь это
    this.bookingService.delete(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter((b) => b.id !== bookingId);
        console.log(`Booking ${bookingId} deleted successfully`);
      },
      error: (err) => {
        console.error(`Failed to delete booking ${bookingId}:`, err);
      },
    });
  }

  calculateDays(start: string | Date, end: string | Date): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
