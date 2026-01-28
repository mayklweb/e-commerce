import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  images: string[];
  qty: number;
}

interface CartState {
  items: Product[];
  totalPrice: number;
}

// Helper function to safely get cart from localStorage
function getInitialCart(): Product[] {
  if (typeof window === "undefined") {
    return []; // Return empty array during SSR
  }
  
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
}

// Helper function to calculate total price
function calculateTotalPrice(items: Product[]): number {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
}

const initialState: CartState = {
  items: getInitialCart(),
  totalPrice: 0,
};

// Update totalPrice after initialization
initialState.totalPrice = calculateTotalPrice(initialState.items);
  
function setCart(arr: Product[]): Product[] {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(arr));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }
  return arr;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      const isContain = state.items.some((item) => item.id === payload.id);
      const newItems = isContain
        ? state.items.map((item) =>
            item.id === payload.id ? { ...item, qty: item.qty + 1 } : item,
          )
        : [...state.items, { ...payload, qty: 1 }];
      state.items = setCart(newItems);
      state.totalPrice = calculateTotalPrice(newItems);
    },
    removeCart: (state, { payload }) => {
      const newItems = state.items.filter((item) => item.id !== payload);
      state.items = setCart(newItems);
      state.totalPrice = calculateTotalPrice(newItems);
    },
    increment: (state, { payload }) => {
      const newItems = state.items.map((item) =>
        item.id === payload ? { ...item, qty: item.qty + 1 } : item,
      );
      state.items = setCart(newItems);
      state.totalPrice = calculateTotalPrice(newItems);
    },
    decrement: (state, { payload }) => {
      const newItems = state.items.map((item) =>
        item.id === payload
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item,
      );
      state.items = setCart(newItems);
      state.totalPrice = calculateTotalPrice(newItems);
    },
    removeAllProducts: (state) => {
      state.items = setCart([]);
      state.totalPrice = 0;
    },
  },
});

export const { addCart, removeCart, increment, decrement, removeAllProducts } =
  cartSlice.actions;

export default cartSlice.reducer;