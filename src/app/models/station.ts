import { Base } from "./base";

export interface Station extends Base {
  name: string;
  location?: string;
  description?: string;
}

export interface StationData {
  id: number;
  name: string;
  location?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MonitoringStation {
  station_id: number;
  station_name: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateStationRequest {
  station_name: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  is_active: boolean;
}

export interface UpdateStationRequest {
  station_name?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  is_active?: boolean;
}

export interface WQIData {
  id: number;
  station_id: number;
  station_name: string;
  measurement_date: string;
  temperature?: number;
  ph?: number;
  do?: number;
  wqi?: number;
  created_at?: string;
} 