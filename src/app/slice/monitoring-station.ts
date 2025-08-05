import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import stationService from "../services/station";
import { 
  MonitoringStation, 
  CreateStationRequest, 
  UpdateStationRequest 
} from "../models/station";

interface State {
  stations: MonitoringStation[];
  loading: boolean;
  error: string | null;
  selectedStation: MonitoringStation | null;
}

const initialState: State = {
  stations: [],
  loading: false,
  error: null,
  selectedStation: null,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

// Async thunks
const fetchAllStations = createAsyncThunk(
  "monitoringStation/fetchAll",
  async () => {
    const result = await stationService.getAllMonitoringStations();
    return result;
  }
);

const fetchStationById = createAsyncThunk(
  "monitoringStation/fetchById",
  async (id: number) => {
    const result = await stationService.getMonitoringStationById(id);
    return result;
  }
);

const searchStationsByName = createAsyncThunk(
  "monitoringStation/searchByName",
  async (name: string) => {
    const result = await stationService.searchMonitoringStationsByName(name);
    return result;
  }
);

const searchStationsByLocation = createAsyncThunk(
  "monitoringStation/searchByLocation",
  async (location: string) => {
    const result = await stationService.searchMonitoringStationsByLocation(location);
    return result;
  }
);

const searchStationsByDescription = createAsyncThunk(
  "monitoringStation/searchByDescription",
  async (description: string) => {
    const result = await stationService.searchMonitoringStationsByDescription(description);
    return result;
  }
);

const fetchActiveStations = createAsyncThunk(
  "monitoringStation/fetchActive",
  async () => {
    const result = await stationService.getActiveMonitoringStations();
    return result;
  }
);

const fetchInactiveStations = createAsyncThunk(
  "monitoringStation/fetchInactive",
  async () => {
    const result = await stationService.getInactiveMonitoringStations();
    return result;
  }
);

const createStation = createAsyncThunk(
  "monitoringStation/create",
  async (data: CreateStationRequest) => {
    const result = await stationService.createMonitoringStation(data);
    return result;
  }
);

const updateStation = createAsyncThunk(
  "monitoringStation/update",
  async ({ id, data }: { id: number; data: UpdateStationRequest }) => {
    const result = await stationService.updateMonitoringStation(id, data);
    return result;
  }
);

const deleteStation = createAsyncThunk(
  "monitoringStation/delete",
  async (id: number) => {
    await stationService.deleteMonitoringStation(id);
    return id;
  }
);

const slice = createSlice({
  name: "monitoringStationSlice",
  initialState,
  reducers: {
    clearStations: (state) => {
      state.stations = [];
      state.error = null;
    },
    setSelectedStation: (state, action: PayloadAction<MonitoringStation | null>) => {
      state.selectedStation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all stations
    builder.addCase(fetchAllStations.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(fetchAllStations.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(fetchAllStations.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to fetch stations",
    }));

    // Fetch station by ID
    builder.addCase(fetchStationById.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(fetchStationById.fulfilled, (state, { payload }) => ({
      ...state,
      selectedStation: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(fetchStationById.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to fetch station",
    }));

    // Search by name
    builder.addCase(searchStationsByName.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(searchStationsByName.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(searchStationsByName.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to search stations",
    }));

    // Search by location
    builder.addCase(searchStationsByLocation.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(searchStationsByLocation.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(searchStationsByLocation.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to search stations by location",
    }));

    // Search by description
    builder.addCase(searchStationsByDescription.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(searchStationsByDescription.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(searchStationsByDescription.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to search stations by description",
    }));

    // Fetch active stations
    builder.addCase(fetchActiveStations.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(fetchActiveStations.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(fetchActiveStations.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to fetch active stations",
    }));

    // Fetch inactive stations
    builder.addCase(fetchInactiveStations.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(fetchInactiveStations.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(fetchInactiveStations.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to fetch inactive stations",
    }));

    // Create station
    builder.addCase(createStation.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(createStation.fulfilled, (state, { payload }) => ({
      ...state,
      stations: [...state.stations, payload],
      loading: false,
      error: null,
    }));
    builder.addCase(createStation.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to create station",
    }));

    // Update station
    builder.addCase(updateStation.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(updateStation.fulfilled, (state, { payload }) => ({
      ...state,
      stations: state.stations.map(station => 
        station.station_id === payload.station_id ? payload : station
      ),
      selectedStation: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(updateStation.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to update station",
    }));

    // Delete station
    builder.addCase(deleteStation.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(deleteStation.fulfilled, (state, { payload }) => ({
      ...state,
      stations: state.stations.filter(station => station.station_id !== payload),
      selectedStation: null,
      loading: false,
      error: null,
    }));
    builder.addCase(deleteStation.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to delete station",
    }));
  },
});

export { 
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
};
export const { clearStations, setSelectedStation, clearError } = slice.actions;
export default slice.reducer; 