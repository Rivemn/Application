import { Amenity } from '../../contracts/Amenity';

export interface AmenityState {
  amenities: (Amenity & { workspaceId: string })[];
  loading: boolean;
  error: string | null;
}
