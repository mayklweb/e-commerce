import { ProductsType } from "@/app/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = ProductsType & { qty: number };

interface CartState {
  cart: CartItem[];
}

const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};

const saveCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState: CartState = {
  cart: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductsType>) {
      const item = action.payload;
      if (item.stock_qty <= 0) return;

      const existing = state.cart.find((p) => p.id === item.id);

      if (existing) {
        existing.qty = Math.min(
          existing.qty + (item.qty || 1),
          item.stock_qty
        );
      } else {
        state.cart.push({ ...item, qty: item.qty || 1 });
      }

      saveCart(state.cart);
    },

    inc(state, action: PayloadAction<number>) {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item) {
        item.qty = Math.min(item.qty + 1, item.stock_qty);
      }
      saveCart(state.cart);
    },

    dec(state, action: PayloadAction<number>) {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
      saveCart(state.cart);
    },

    remove(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
      saveCart(state.cart);
    },

    clearCart(state) {
      state.cart = [];
      saveCart(state.cart);
    },
  },
});

export const {
  addToCart,
  inc,
  dec,
  remove,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
