import { createSlice } from "@reduxjs/toolkit";
import { CategoryNames, Currency } from "../../utils/types";

interface CurrencyAndCategory {
  currencyData: Currency[];
  categoryNamesData: CategoryNames;
  selectedCurrency: string;
  currentCategoryName: string;
}

const initialState: CurrencyAndCategory = {
  currencyData: [],
  categoryNamesData: {
    category: {
      name: "",
      input: [{ category: "" }],
    },
  },
  selectedCurrency: "$",
  currentCategoryName: "all",
};

const currencySlice = createSlice({
  name: "CurrencyAndCategory",
  initialState,
  reducers: {
    currencies: (state, { payload }) => {
      state.currencyData = payload;
    },
    selectCurrency: (state, { payload }) => {
      state.selectedCurrency = payload;
    },
    selectedCategory: (state, { payload }) => {
      state.currentCategoryName = payload;
    },
    categoryNamesData: (state, { payload }) => {
      state.categoryNamesData = payload;
    },
  },
});

export const {
  selectCurrency,
  selectedCategory,
  currencies,
  categoryNamesData,
} = currencySlice.actions;

export default currencySlice.reducer;
