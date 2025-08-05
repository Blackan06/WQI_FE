import { 
  StationData, 
  WQIData, 
  MonitoringStation, 
  CreateStationRequest, 
  UpdateStationRequest 
} from "../models/station";
import apiLinks from "../utils/api-link";
import httpClient from "../utils/http-client";

// WQI Data operations
const getStations = async (): Promise<WQIData[]> => {
  // Call the endpoint directly without /all
  const response = await httpClient.get({
    url: apiLinks.station.getByName,
  });
  return response.data;
};

const getStationByName = async (name: string): Promise<WQIData[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.station.getByName}/${name}`,
  });
  return response.data;
};

// Monitoring Station CRUD operations
const getAllMonitoringStations = async (): Promise<MonitoringStation[]> => {
  const response = await httpClient.get({
    url: apiLinks.station.getAll,
  });
  return response.data;
};

const getMonitoringStationById = async (id: number): Promise<MonitoringStation> => {
  const response = await httpClient.get({
    url: `${apiLinks.station.getById}/${id}`,
  });
  return response.data;
};

const searchMonitoringStationsByName = async (name: string): Promise<MonitoringStation[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.station.searchByName}/${name}`,
  });
  return response.data;
};

const searchMonitoringStationsByLocation = async (location: string): Promise<MonitoringStation[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.station.searchByLocation}/${location}`,
  });
  return response.data;
};

const searchMonitoringStationsByDescription = async (description: string): Promise<MonitoringStation[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.station.searchByDescription}/${description}`,
  });
  return response.data;
};

const getActiveMonitoringStations = async (): Promise<MonitoringStation[]> => {
  const response = await httpClient.get({
    url: apiLinks.station.getActive,
  });
  return response.data;
};

const getInactiveMonitoringStations = async (): Promise<MonitoringStation[]> => {
  const response = await httpClient.get({
    url: apiLinks.station.getInactive,
  });
  return response.data;
};

const createMonitoringStation = async (data: CreateStationRequest): Promise<MonitoringStation> => {
  const response = await httpClient.post({
    url: apiLinks.station.create,
    data: data,
  });
  return response.data;
};

const updateMonitoringStation = async (id: number, data: UpdateStationRequest): Promise<MonitoringStation> => {
  const response = await httpClient.put({
    url: `${apiLinks.station.update}/${id}`,
    data: data,
  });
  return response.data;
};

const deleteMonitoringStation = async (id: number): Promise<void> => {
  await httpClient.delete({
    url: `${apiLinks.station.delete}/${id}`,
  });
};

const stationService = { 
  // WQI Data operations
  getStations,
  getStationByName,
  
  // Monitoring Station CRUD operations
  getAllMonitoringStations,
  getMonitoringStationById,
  searchMonitoringStationsByName,
  searchMonitoringStationsByLocation,
  searchMonitoringStationsByDescription,
  getActiveMonitoringStations,
  getInactiveMonitoringStations,
  createMonitoringStation,
  updateMonitoringStation,
  deleteMonitoringStation,
};

export default stationService; 