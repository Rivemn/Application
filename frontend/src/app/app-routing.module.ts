// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingPageComponent } from './booking/booking-page.component';
import { MyBookingsComponent } from './booking/my-bookings/my-bookings.component';
import { CoworkingDetailsComponent } from './coworking-details/coworking-details.component';

const routes: Routes = [
  { path: 'coworking', component: CoworkingDetailsComponent },
  { path: 'booking/:id', component: BookingPageComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: '', redirectTo: '/coworking', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
