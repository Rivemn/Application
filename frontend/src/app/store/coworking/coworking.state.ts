import { Coworking } from '../../contracts/Coworking';

export interface CoworkingState {
  coworkings: Coworking[];
  selectedCoworking: Coworking | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CoworkingState = {
  coworkings: [],
  selectedCoworking: null,
  loading: false,
  error: null,
};
