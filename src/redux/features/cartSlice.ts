import { createSlice } from "@reduxjs/toolkit";
import { Data, Products } from "../../utils/types";

// interface CartItems {
//   item;
// }

export interface InitialState {
  cartItems: Products[];
  total: number;
  size: string;
  colour: string;
  success: boolean;
  data: Data;
}

const initialState: InitialState = {
  cartItems: [],
  total: 0,
  size: "",
  colour: "",
  success: false,
  data: {
    category: {
      name: "",
      products: [],
    },
  },
  // isLoading: true,
};

// console.log("State", initialState.cartItems);

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
      // state.success = true;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseQuantity: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      const dataItem = state.data.category.products.find(
        (item) => item.id === payload.id
      );

      if (cartItem && dataItem) {
        cartItem.quantity++;
        cartItem.prices.map(
          (el, i) => (el.amount += dataItem.prices[i].amount)
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
    selectedSize: (state, { payload }) => {
      state.size = payload;
    },
    selectedColour: (state, { payload }) => {
      state.colour = payload;
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
} = cartSlice.actions;

export default cartSlice.reducer;
