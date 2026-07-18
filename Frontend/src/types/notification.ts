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