import { createReducer, on } from '@ngrx/store';
import {
  loadCoworkings,
  loadCoworkingsSuccess,
  loadCoworkingsFailure,
} from './coworking.actions';
import { Coworking } from '../../contracts/Coworking';

export interface CoworkingState {
  coworkings: Coworking[];
  loading: boolean;
  error: string | null;
}

export const initialState: CoworkingState = {
  coworkings: [],
  loading: false,
  error: null,
};

export const coworkingReducer = createReducer(
  initialState,
  on(loadCoworkings, (state) => ({ ...state, loading: true, error: null })),
  on(loadCoworkingsSuccess, (state, { coworkings }) => ({
    ...state,
    coworkings,
    loading: false,
    error: null,
  })),
  on(loadCoworkingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
