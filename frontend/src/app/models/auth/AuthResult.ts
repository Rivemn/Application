import { AuthResponse } from './AuthResponse';

export interface AuthResult {
  succeeded: boolean;
  response?: AuthResponse;
  errors?: string[];
}
