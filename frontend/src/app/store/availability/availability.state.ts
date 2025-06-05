import { Availability } from '../../contracts/Availability';

export interface AvailabilityState {
  availabilities: Availability[];
  loading: boolean;
  error: string | null;
}
