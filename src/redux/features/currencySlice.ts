import { createSlice } from "@reduxjs/toolkit";

interface Currency {
  selectedCurrency: string;
  currentCategoryName: string;
}

const initialState: Currency = {
  selectedCurrency: "$ usd",
  currentCategoryName: "all",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    selectCurrency: (state, { payload }) => {
      state.selectedCurrency = payload;
    },
    selectedCategory: (state, { payload }) => {
      state.currentCategoryName = payload;
    },
  },
});

export const { selectCurrency, selectedCategory } = currencySlice.actions;

export default currencySlice.reducer;
