import { Component, signal } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent {
  hours = ['2:00 AM', '3:00 AM', '4:00 AM', '4:30 AM'];
  selectedTime = signal<string>('2:00 AM');

  onTimeSelected(time: string) {
    this.selectedTime.set(time);
  }
}
