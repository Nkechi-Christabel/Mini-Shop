import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  size: string;
  colour: string;
}

const initialState: InitialState = {
  size: "",
  colour: "",
};

const itemDetailsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectedSize: (state, { payload }) => {
      state.size = payload;
    },
    selectedColour: (state, { payload }) => {
      state.colour = payload;
    },
  },
});

export const { selectedSize, selectedColour } = itemDetailsSlice.actions;

export default itemDetailsSlice.reducer;
