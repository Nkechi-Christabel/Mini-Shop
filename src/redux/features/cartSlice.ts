import { createSlice } from "@reduxjs/toolkit";

import { Data, Products } from "../../utils/types";
import { v4 as uuid } from "uuid";

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
      const itemInCart = state.cartItems.find(
        (item) =>
          item.name === payload.name &&
          item.attributes.every(
            (attr, i) =>
              attr.selectedSize === payload.attributes[i].selectedSize
          ) &&
          item.attributes.every(
            (attr, i) =>
              attr.selectedColor === payload.attributes[i].selectedColor
          )
      );

      if (payload?.inStock) {
        if (itemInCart) {
          itemInCart.quantity++;
        } else {
          payload.id = uuid();
          state.cartItems.push({ ...payload, quantity: 1 });
        }
      }
    },
    increaseQuantity: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);

      if (cartItem) {
        cartItem && cartItem.quantity++;
      }
    },

    decreaseQuantity: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);

      if (cartItem) {
        if (cartItem?.quantity === 1) {
          cartItem.quantity = 1;
        } else {
          cartItem.quantity--;
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
      let subTotal = state.cartItems
        .flatMap((item) =>
          item.prices.map((price) =>
            price.currency.symbol === payload ? price.amount * item.quantity : 0
          )
        )
        .filter(Boolean)
        .reduce((a, b) => a + b, 0);

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
