import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import authService from "../services/auth";
import { LoginResponse } from "../models/user";

interface State {
  token: LoginResponse | null;
  loginLoading: boolean;
}

const initialState: State = {
  token: null,
  loginLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const signin = createAsyncThunk(
  "auth/signin",
  async (arg: { username: string; password: string }) => {
    const { username, password } = arg;
    const result = await authService.login(username, password);
    return result;
  }
);

const logoutCR: CR<void> = () => ({
  ...initialState,
});

const slice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: logoutCR,
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(signin.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload,
      loginLoading: false,
    }));
    builder.addCase(signin.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));
  },
});

export { signin };
export const { logout } = slice.actions;
export default slice.reducer;
