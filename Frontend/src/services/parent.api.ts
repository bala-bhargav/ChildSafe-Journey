import { apiClient } from './api.client';
import type { EtaData } from '@/types/socket';

export const parentApi = {
  getStudentInfo: () =>
    apiClient.get<{
      student: any;
      route: { id: string; routeName: string } | null;
      assignedStop: any | null;
    }>('/parent/student-info'),

  getLiveTracking: () =>
    apiClient.get<{
      active: boolean;
      rideSessionId?: string;
      busId?: string;
      currentLocation?: [number, number];
      speed?: number;
      currentStopIndex?: number;
      etas?: EtaData[];
      message?: string;
    }>('/parent/rides/live'),

  getNotifications: () =>
    apiClient.get<any[]>('/parent/notifications'),
};