import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

if (!SOCKET_URL) {
  if (import.meta.env.PROD) {
    throw new Error('VITE_SOCKET_URL environment variable is required in production');
  }
  console.warn('[socket.client] VITE_SOCKET_URL not set, defaulting to http://localhost:5001');
}

export interface ServerToClientEvents {
  notification: (data: NotificationPayload) => void;
  live_location: (data: LiveLocationPayload) => void;
  eta_update: (data: EtaUpdatePayload) => void;
}

export interface ClientToServerEvents {
  join_ride: (rideSessionId: string) => void;
  leave_ride: (rideSessionId: string) => void;
  location_update: (data: LocationUpdatePayload) => void;
}

export interface NotificationPayload {
  id: string;
  title: string;
  message: string;
  type: 'bus_started' | 'student_boarded' | 'bus_near' | 'eta_update' | 'ride_completed';
  createdAt: string;
  isRead: boolean;
}

export interface LiveLocationPayload {
  lat: number;
  lng: number;
  speed: number;
  timestamp: string;
  currentStopIndex: number;
}

export interface EtaUpdatePayload {
  etas: Array<{
    stopId: string;
    stopName: string;
    etaMinutes: number;
  }>;
}

export interface LocationUpdatePayload {
  rideSessionId: string;
  lat: number;
  lng: number;
  speed?: number;
}

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on('connect', () => {
      console.log('[Socket] Connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error.message);
      this.reconnectAttempts++;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRide(rideSessionId: string) {
    this.socket?.emit('join_ride', rideSessionId);
  }

  leaveRide(rideSessionId: string) {
    this.socket?.emit('leave_ride', rideSessionId);
  }

  sendLocationUpdate(data: LocationUpdatePayload) {
    this.socket?.emit('location_update', data);
  }

  onNotification(callback: (data: NotificationPayload) => void) {
    this.socket?.on('notification', callback);
  }

  offNotification(callback: (data: NotificationPayload) => void) {
    this.socket?.off('notification', callback);
  }

  onLiveLocation(callback: (data: LiveLocationPayload) => void) {
    this.socket?.on('live_location', callback);
  }

  offLiveLocation(callback: (data: LiveLocationPayload) => void) {
    this.socket?.off('live_location', callback);
  }

  onEtaUpdate(callback: (data: EtaUpdatePayload) => void) {
    this.socket?.on('eta_update', callback);
  }

  offEtaUpdate(callback: (data: EtaUpdatePayload) => void) {
    this.socket?.off('eta_update', callback);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();