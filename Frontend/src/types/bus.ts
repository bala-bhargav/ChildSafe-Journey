export type BusStatus = 'idle' | 'active' | 'maintenance';

export interface DriverInfo {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  capacity: number;
  busModel?: string;
  driverId: string | null;
  driver?: DriverInfo;
  status: BusStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusRequest {
  busNumber: string;
  capacity: number;
  busModel?: string;
  driverId?: string | null;
}

export interface UpdateBusRequest {
  capacity?: number;
  busModel?: string;
  driverId?: string | null;
  status?: BusStatus;
}