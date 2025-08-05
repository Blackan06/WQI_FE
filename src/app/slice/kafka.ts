import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import kafkaService from "../services/kafka";
import { KafkaBatchRequest, KafkaResponse } from "../models/kafka";

interface State {
  loading: boolean;
  error: string | null;
  lastResponse: KafkaResponse | null;
}

const initialState: State = {
  loading: false,
  error: null,
  lastResponse: null,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const produceBatch = createAsyncThunk(
  "kafka/produceBatch",
  async (data: KafkaBatchRequest) => {
    const result = await kafkaService.produceBatch(data);
    return result;
  }
);

const slice = createSlice({
  name: "kafkaSlice",
  initialState,
  reducers: {
    clearResponse: (state) => {
      state.lastResponse = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(produceBatch.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    builder.addCase(produceBatch.fulfilled, (state, { payload }) => ({
      ...state,
      lastResponse: payload,
      loading: false,
      error: null,
    }));
    builder.addCase(produceBatch.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || "Failed to send Kafka messages",
    }));
  },
});

export { produceBatch };
export const { clearResponse } = slice.actions;
export default slice.reducer; 