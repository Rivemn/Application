import { Routes } from '@angular/router';
import { CoworkingDetailsComponent } from './coworking-details/coworking-details.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

export const routes: Routes = [
  { path: 'coworking', component: CoworkingDetailsComponent },
  { path: 'booking/:id', component: BookingPageComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: '', redirectTo: '/coworking', pathMatch: 'full' },
];
