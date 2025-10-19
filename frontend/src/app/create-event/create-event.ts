import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: false,
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Создаем реактивную форму
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      capacity: [''],
      visibility: ['public', Validators.required],
    });
  }

  // Метод для отправки формы (пока просто выводит в консоль)
  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log('Form Submitted!', this.eventForm.value);
    }
  }
}
