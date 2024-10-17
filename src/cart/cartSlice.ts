import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ICartState {
  items: ICartItem[];
  total: number;
}

const initialState: ICartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});


export const { addToCart, updateCartItem, removeCartItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: ICartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: ICartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
