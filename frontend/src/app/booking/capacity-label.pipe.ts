// src/app/booking/capacity-label.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAvailabilities } from '../store/booking/booking.selectors';

@Pipe({
  name: 'capacityLabel',
  standalone: true,
})
export class CapacityLabelPipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(availabilityId: string): Observable<string> {
    return this.store.select(selectAvailabilities).pipe(
      map((availabilities) => {
        const availability = availabilities.find(
          (a) => a.id === availabilityId
        );
        return availability
          ? `${availability.capacityOption} ${
              availability.capacityOption === 1 ? 'person' : 'people'
            }`
          : 'Unknown capacity';
      })
    );
  }
}
