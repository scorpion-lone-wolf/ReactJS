import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      // assuming action.payload will be pizzaId
      state.cart = state.cart.filter(
        (cartItem) => cartItem.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity: (state, action) => {
      // assuming action.payload will be pizzaId
      const item = state.cart.find((item) => {
        item.pizzaId === action.payload;
      });
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity: (state, action) => {
      // assuming action.payload will be pizzaId
      const item = state.cart.find((item) => {
        item.pizzaId === action.payload;
      });
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

const selectedCart = (state) => state.cart.cart;
export const getTotalCartQuantityAndPrice = createSelector(
  [selectedCart],
  (cart) => {
    return cart.reduce(
      (acc, item) => {
        return {
          quantity: acc.quantity + item.quantity,
          totalPrice: acc.totalPrice + item.totalPrice,
        };
      },
      { quantity: 0, totalPrice: 0 },
    );
  },
);
export const getCurrentQuantityById = (id) => {
  return (state) => {
    const pizza = state.cart.cart.find((item) => item.pizzaId === id);
    return pizza?.quantity;
  };
};
