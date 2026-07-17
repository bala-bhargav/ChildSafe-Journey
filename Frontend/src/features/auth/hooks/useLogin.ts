import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth.service';
import { LoginRequest } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });
};