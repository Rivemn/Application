// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingPageComponent } from './booking/booking-page/booking-page.component';
import { MyBookingsComponent } from './booking/my-bookings/my-bookings.component';
import { CoworkingDetailsComponent } from './coworking/coworking-details/coworking-details.component';
import { CoworkingListComponent } from './coworking/coworking-list/coworking-list.component';

const routes: Routes = [
  { path: 'coworking/:id', component: CoworkingDetailsComponent },
  { path: 'coworking-list', component: CoworkingListComponent },
  { path: 'booking/:coworkingId', component: BookingPageComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: '', redirectTo: '/coworking-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
