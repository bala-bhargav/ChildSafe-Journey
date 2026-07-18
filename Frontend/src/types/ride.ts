export type RideSessionStatus = 'ongoing' | 'completed';

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface RouteStop {
  stopId: string;
  stopName: string;
  sequence: number;
  expectedTime: string;
  location: GeoPoint;
}

export interface GpsLog {
  location: GeoPoint;
  speed?: number; // km/h
  timestamp: string;
}

export interface AttendanceLog {
  studentId: string;
  status: 'boarded' | 'absent' | 'pending';
  timestamp?: string;
}

export interface RideSession {
  id: string;
  busId: string;
  bus?: BusInfo;
  driverId: string;
  driver?: DriverInfo;
  routeId: string;
  route?: RouteInfo;
  status: RideSessionStatus;
  startTime: string;
  endTime?: string;
  currentStopIndex: number;
  gpsLogs: GpsLog[];
  attendance: AttendanceLog[];
  createdAt: string;
  updatedAt: string;
}

export interface BusInfo {
  id: string;
  busNumber: string;
  capacity: number;
  busModel?: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface RouteInfo {
  id: string;
  routeName: string;
  stops: RouteStop[];
}

export interface StartRideRequest {
  busId: string;
  routeId: string;
}

export interface EndRideRequest {
  rideSessionId: string;
}

export interface GpsUpdateRequest {
  rideSessionId: string;
  lat: number;
  lng: number;
  speed?: number;
}

export interface MarkAttendanceRequest {
  rideSessionId: string;
  studentId: string;
  status: 'boarded' | 'absent';
}