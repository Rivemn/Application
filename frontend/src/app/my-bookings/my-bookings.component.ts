import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-bookings',
  imports: [ReactiveFormsModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent {
  form: FormGroup;

  roomOptions = [
    { id: 1, name: 'Room for 1 person' },
    { id: 2, name: 'Room for 2 people' },
    { id: 3, name: 'Room for 5 people' },
    { id: 4, name: 'Room for 10 people' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      room: [this.roomOptions[0]],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
