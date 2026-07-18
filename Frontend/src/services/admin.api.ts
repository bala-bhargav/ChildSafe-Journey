import { apiClient } from './api.client';
import type { Bus, CreateBusRequest, UpdateBusRequest } from '@/types/bus';
import type { Route, CreateRouteRequest } from '@/types/route';
import type { Student, CreateStudentRequest, AssignStudentBusStopRequest } from '@/types/student';

export const adminApi = {
  // Drivers
  getDrivers: () => apiClient.get('/admin/drivers'),
  createDriver: (data: { name: string; email: string; password: string; phoneNumber: string }) =>
    apiClient.post('/admin/drivers', data),
  updateDriver: (id: string, data: { name: string; phoneNumber: string }) =>
    apiClient.put(`/admin/drivers/${id}`, data),
  deleteDriver: (id: string) => apiClient.delete(`/admin/drivers/${id}`),

  // Buses
  getBuses: () => apiClient.get<Bus[]>('/admin/buses'),
  createBus: (data: CreateBusRequest) => apiClient.post<Bus>('/admin/buses', data),
  updateBus: (id: string, data: UpdateBusRequest) => apiClient.put<Bus>(`/admin/buses/${id}`, data),
  deleteBus: (id: string) => apiClient.delete(`/admin/buses/${id}`),

  // Routes
  getRoutes: () => apiClient.get<Route[]>('/admin/routes'),
  createRoute: (data: CreateRouteRequest) => apiClient.post<Route>('/admin/routes', data),

  // Students
  getStudents: () => apiClient.get<Student[]>('/admin/students'),
  createStudent: (data: CreateStudentRequest) => apiClient.post<Student>('/admin/students', data),
  bulkImportStudents: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/admin/students/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  assignStudentBusStop: (data: AssignStudentBusStopRequest) =>
    apiClient.post('/admin/students/assign', data),

  // Live Rides
  getLiveRides: () => apiClient.get('/admin/rides/live'),
};