import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import stationService from "../services/station";
import { WQIData } from "../models/station";

interface State {
  stations: WQIData[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  stations: [],
  loading: false,
  error: null,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const fetchStations = createAsyncThunk(
  "station/fetchStations",
  async () => {
    const result = await stationService.getStations();
    return result;
  }
);

const searchStationsByName = createAsyncThunk(
  "station/searchStationsByName",
  async (name: string) => {
    const result = await stationService.getStationByName(name);
    return result;
  }
);

const slice = createSlice({
  name: "stationSlice",
  initialState,
  reducers: {
    clearStations: (state) => {
      state.stations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch stations
    builder.addCase(fetchStations.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(fetchStations.fulfilled, (state, { payload }) => ({
      ...state,
      stations: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(fetchStations.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to fetch stations",
    }));

    // Search stations by name
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
  },
});

export { fetchStations, searchStationsByName };
export const { clearStations } = slice.actions;
export default slice.reducer; 