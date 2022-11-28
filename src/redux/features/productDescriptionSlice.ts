import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../utils/types";
interface InitialState {
  item: Products[];
}

const initialState: InitialState = {
  item: [],
};

const itemDetailsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectedSize: (state, { payload }) => {
      const { val, product } = payload;
      const existingItem = state.item.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.selectedAttrText = val;
      } else {
        state.item.push({ ...product, selectedAttrText: val });
      }
    },
    selectedColour: (state, { payload }) => {
      const { val, product } = payload;
      const existingItem = state.item.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.selectedAttrSwatch = val;
      } else {
        state.item.push({ ...product, selectedAttrSwatch: val });
      }
    },
    resetSelectedItems: (state) => {
      state.item = [];
    },
  },
});

export const { selectedSize, selectedColour, resetSelectedItems } =
  itemDetailsSlice.actions;

export default itemDetailsSlice.reducer;
