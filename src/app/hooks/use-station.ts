import { useCallback } from "react";
import { fetchStations, searchStationsByName } from "../slice/station";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";

import { WQIData } from "../models/station";

type UseStation = {
  stations: WQIData[];
  loading: boolean;
  error: string | null;
  fetchStations: () => Promise<void>;
  searchStationsByName: (name: string) => Promise<void>;
};

const useStation = (): UseStation => {
  const dispatch = useDispatch();
  const { stations, loading, error } = useSelector((state: any) => state.stationSlice);

  const fetchStationsAction = useCallback(async (): Promise<void> => {
    await dispatch(fetchStations());
  }, [dispatch]);

  const searchStationsByNameAction = useCallback(async (name: string): Promise<void> => {
    await dispatch(searchStationsByName(name));
  }, [dispatch]);

  return {
    stations,
    loading,
    error,
    fetchStations: fetchStationsAction,
    searchStationsByName: searchStationsByNameAction,
  };
};

export default useStation; 