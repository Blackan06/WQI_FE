import { useCallback } from "react";
import { 
  fetchAllStations,
  fetchStationById,
  searchStationsByName,
  searchStationsByLocation,
  searchStationsByDescription,
  fetchActiveStations,
  fetchInactiveStations,
  createStation,
  updateStation,
  deleteStation,
} from "../slice/monitoring-station";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { MonitoringStation, CreateStationRequest, UpdateStationRequest } from "../models/station";

type UseMonitoringStation = {
  stations: MonitoringStation[];
  loading: boolean;
  error: string | null;
  selectedStation: MonitoringStation | null;
  fetchAllStations: () => Promise<void>;
  fetchStationById: (id: number) => Promise<void>;
  searchStationsByName: (name: string) => Promise<void>;
  searchStationsByLocation: (location: string) => Promise<void>;
  searchStationsByDescription: (description: string) => Promise<void>;
  fetchActiveStations: () => Promise<void>;
  fetchInactiveStations: () => Promise<void>;
  createStation: (data: CreateStationRequest) => Promise<void>;
  updateStation: (id: number, data: UpdateStationRequest) => Promise<void>;
  deleteStation: (id: number) => Promise<void>;
};

const useMonitoringStation = (): UseMonitoringStation => {
  const dispatch = useDispatch();
  const { stations, loading, error, selectedStation } = useSelector((state: any) => state.monitoringStationSlice);

  const fetchAllStationsAction = useCallback(async (): Promise<void> => {
    await dispatch(fetchAllStations());
  }, [dispatch]);

  const fetchStationByIdAction = useCallback(async (id: number): Promise<void> => {
    await dispatch(fetchStationById(id));
  }, [dispatch]);

  const searchStationsByNameAction = useCallback(async (name: string): Promise<void> => {
    await dispatch(searchStationsByName(name));
  }, [dispatch]);

  const searchStationsByLocationAction = useCallback(async (location: string): Promise<void> => {
    await dispatch(searchStationsByLocation(location));
  }, [dispatch]);

  const searchStationsByDescriptionAction = useCallback(async (description: string): Promise<void> => {
    await dispatch(searchStationsByDescription(description));
  }, [dispatch]);

  const fetchActiveStationsAction = useCallback(async (): Promise<void> => {
    await dispatch(fetchActiveStations());
  }, [dispatch]);

  const fetchInactiveStationsAction = useCallback(async (): Promise<void> => {
    await dispatch(fetchInactiveStations());
  }, [dispatch]);

  const createStationAction = useCallback(async (data: CreateStationRequest): Promise<void> => {
    await dispatch(createStation(data));
  }, [dispatch]);

  const updateStationAction = useCallback(async (id: number, data: UpdateStationRequest): Promise<void> => {
    await dispatch(updateStation({ id, data }));
  }, [dispatch]);

  const deleteStationAction = useCallback(async (id: number): Promise<void> => {
    await dispatch(deleteStation(id));
  }, [dispatch]);

  return {
    stations,
    loading,
    error,
    selectedStation,
    fetchAllStations: fetchAllStationsAction,
    fetchStationById: fetchStationByIdAction,
    searchStationsByName: searchStationsByNameAction,
    searchStationsByLocation: searchStationsByLocationAction,
    searchStationsByDescription: searchStationsByDescriptionAction,
    fetchActiveStations: fetchActiveStationsAction,
    fetchInactiveStations: fetchInactiveStationsAction,
    createStation: createStationAction,
    updateStation: updateStationAction,
    deleteStation: deleteStationAction,
  };
};

export default useMonitoringStation; 