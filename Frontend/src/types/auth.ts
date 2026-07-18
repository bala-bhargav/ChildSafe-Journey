export type UserRole = 'admin' | 'driver' | 'parent_student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}