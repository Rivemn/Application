import { Routes } from '@angular/router';
import { CoworkingDetailsComponent } from './coworking-details/coworking-details.component';

export const routes: Routes = [
  { path: 'coworking', component: CoworkingDetailsComponent },
  { path: '', redirectTo: '/coworking', pathMatch: 'full' },
];
