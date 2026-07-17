export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'driver' | 'parent';
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
