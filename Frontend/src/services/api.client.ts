import axios from 'axios';
// @ts-ignore - env access via Vite
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  }
);
