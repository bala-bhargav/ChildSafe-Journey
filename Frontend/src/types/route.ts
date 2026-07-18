export interface RouteStop {
  stopId: string;
  stopName: string;
  sequence: number;
  expectedTime: string; // e.g. "08:15 AM"
  location: GeoPoint;
}

export interface Route {
  id: string;
  routeName: string;
  stops: RouteStop[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRouteRequest {
  routeName: string;
  stops: CreateRouteStopRequest[];
}

export interface CreateRouteStopRequest {
  stopId: string;
  stopName: string;
  sequence: number;
  expectedTime: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}