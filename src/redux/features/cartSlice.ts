import { createSlice } from "@reduxjs/toolkit";

import { Data, Products } from "../../utils/types";

export interface InitialState {
  cartItems: Products[];
  data: Data;
  total: number;
  tax: number;
}

const initialState: InitialState = {
  cartItems: [],
  data: {
    category: {
      name: "",
      products: [],
    },
  },
  total: 0,
  tax: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload;
    },
    addToCart: (state, { payload }) => {
      const itemInCart = state.cartItems.find((item) => item.id === payload.id);
      if (payload.inStock) {
        if (itemInCart) {
          itemInCart.quantity++;
        } else {
          state.cartItems.push({ ...payload, quantity: 1 });
        }
      }
    },
    increaseQuantity: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      const dataItem = state.data.category.products.find(
        (item) => item.id === payload.id
      );

      if (cartItem && dataItem) {
        cartItem.quantity++;
        cartItem.prices.map(
          (el, i) => (el.amount = dataItem.prices[i].amount * cartItem.quantity)
        );
      }
    },

    decreaseQuantity: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      const dataItem = state.data.category.products.find(
        (item) => item.id === payload.id
      );
      if (cartItem && dataItem) {
        if (cartItem?.quantity === 1) {
          cartItem.quantity = 1;
        } else {
          cartItem.quantity--;
          cartItem.prices.map(
            (el, i) => (el.amount -= dataItem.prices[i].amount)
          );
        }
      }
    },
    removeItem: (state, { payload }) => {
      const cartItem = state.cartItems.filter((item) => item.id !== payload.id);
      state.cartItems = cartItem;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
 
    calculateTotals: (state, { payload }) => {
      const matchSelectedCurrencyToAmount = state.cartItems.flatMap((item) =>
        item.prices.filter(
          (price) => price.currency.symbol === payload && price.amount
        )
      );

      let subTotal = matchSelectedCurrencyToAmount.reduce(
        (a, b) => a + b.amount,
        0
      );

      state.tax = (subTotal * 21) / 100;
      state.total = subTotal + state.tax;
    },
  },
});

export const {
  getData,
  addToCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
