import { Photo } from '../../contracts/Photo';

export interface PhotoState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}
