import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@/constants/app.constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  if (import.meta.env.PROD) {
    throw new Error('VITE_API_BASE_URL environment variable is required in production');
  }
  console.warn('[api.client] VITE_API_BASE_URL not set, defaulting to http://localhost:5001/api');
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor - attach JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Shared auth cleanup - can be called from anywhere
export const clearAuthAndRedirect = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  // Dispatch custom event for any listeners (e.g., socket cleanup)
  window.dispatchEvent(new CustomEvent('auth:logout'));
  // Only redirect if not already on login page
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      clearAuthAndRedirect();
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};