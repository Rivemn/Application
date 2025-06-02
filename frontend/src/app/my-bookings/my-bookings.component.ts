import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  imports: [ReactiveFormsModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent {
  constructor(private router: Router) {}

  goToCoworking() {
    this.router.navigate(['/coworking']);
  }
}
