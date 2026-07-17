import { apiClient } from '@/services/api.client';
import { LoginRequest, LoginResponse } from '../types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: response } = await apiClient.post<LoginResponse>('/auth/login', data);
  return response;
};
