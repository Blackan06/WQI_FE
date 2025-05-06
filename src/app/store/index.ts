// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import appReducers from "../slice";

const store = configureStore({
  reducer: {
    ...appReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
// thêm dòng này:
export type AppState = RootState;

export type AppDispatch = typeof store.dispatch;

export default store;
