export type NotificationType =
  | 'bus_started'
  | 'student_boarded'
  | 'bus_near'
  | 'eta_update'
  | 'ride_completed';

export interface Notification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationEvent {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  isRead: boolean;
}

export interface SocketEvents {
  // Server -> Client
  notification: (data: NotificationEvent) => void;
  live_location: (data: LiveLocationData) => void;
  eta_update: (data: { etas: EtaData[] }) => void;

  // Client -> Server
  join_ride: (rideSessionId: string) => void;
  leave_ride: (rideSessionId: string) => void;
  location_update: (data: LocationUpdateData) => void;
}

export interface LiveLocationData {
  lat: number;
  lng: number;
  speed: number;
  timestamp: string;
  currentStopIndex: number;
}

export interface EtaData {
  stopId: string;
  stopName: string;
  etaMinutes: number;
  passed: boolean;
}

export interface LocationUpdateData {
  rideSessionId: string;
  lat: number;
  lng: number;
  speed?: number;
}