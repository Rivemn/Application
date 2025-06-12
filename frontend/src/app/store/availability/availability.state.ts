import { Availability } from '../../contracts/Availability';

export interface AvailabilityState {
  availabilities: Availability[];
  availabilityById: { [id: string]: Availability };
  loading: boolean;
  error: string | null;
}
