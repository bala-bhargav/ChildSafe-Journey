// Auth
export * from './auth';

// Models - explicit type exports to avoid conflicts

// bus.ts: BusStatus, DriverInfo, Bus, CreateBusRequest, UpdateBusRequest
export type { BusStatus, DriverInfo, Bus, CreateBusRequest, UpdateBusRequest } from './bus';

// route.ts: RouteStop, Route, CreateRouteRequest, CreateRouteStopRequest, GeoPoint
export type { RouteStop, Route, CreateRouteRequest, CreateRouteStopRequest, GeoPoint } from './route';

// student.ts: Student, ParentInfo, BusSummary, CreateStudentRequest, AssignStudentBusStopRequest, BulkImportStudentRow, BulkImportResult
export type { Student, ParentInfo, BusSummary, CreateStudentRequest, AssignStudentBusStopRequest, BulkImportStudentRow, BulkImportResult } from './student';

// ride.ts: RideSessionStatus, GpsLog, AttendanceLog, RideSession, BusInfo, RouteInfo, StartRideRequest, EndRideRequest, GpsUpdateRequest, MarkAttendanceRequest
// Note: GeoPoint, RouteStop, DriverInfo are also in ride.ts but we get them from route.ts and bus.ts
export type {
  RideSessionStatus,
  GpsLog,
  AttendanceLog,
  RideSession,
  BusInfo,
  RouteInfo,
  StartRideRequest,
  EndRideRequest,
  GpsUpdateRequest,
  MarkAttendanceRequest,
} from './ride';

// notification.ts: NotificationType, Notification, NotificationEvent
export type { NotificationType, Notification, NotificationEvent } from './notification';

// socket.ts: SocketEvents, LiveLocationData, EtaData, LocationUpdateData
// Note: NotificationType, Notification, NotificationEvent are also in socket.ts but we get them from notification.ts
export type { SocketEvents, LiveLocationData, EtaData, LocationUpdateData } from './socket';

// Common
export * from './common';