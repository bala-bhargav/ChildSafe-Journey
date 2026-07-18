import { apiClient } from './api.client';

export const driverApi = {
  getBuses: () =>
    apiClient.get<any[]>('/driver/buses'),

  startRide: (data: { busId: string; routeId: string }) =>
    apiClient.post<{ rideSessionId: string; session: any }>('/driver/rides/start', data),

  endRide: (rideSessionId: string) =>
    apiClient.post('/driver/rides/end', { rideSessionId }),

  updateGps: (data: { rideSessionId: string; lat: number; lng: number; speed?: number }) =>
    apiClient.post('/driver/gps/update', data),

  markAttendance: (data: { rideSessionId: string; studentId: string; status: 'boarded' | 'absent' }) =>
    apiClient.post('/driver/attendance/mark', data),
};