import { createSlice } from "@reduxjs/toolkit";

interface State {
  collapsed: boolean;
  sliderMenuItemSelectedKey: string;
}

const initialState: State = {
  collapsed: false,
  sliderMenuItemSelectedKey: "home",
};

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setSliderMenuItemSelectedKey: (state, action) => {
      state.sliderMenuItemSelectedKey = action.payload;
    },
  },
});

export const { setCollapsed, setSliderMenuItemSelectedKey } = slice.actions;

export default slice.reducer;
