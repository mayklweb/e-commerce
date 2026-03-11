import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductsType } from "@/app/types";

interface CartItem {
  id: number;
  count: number;
  stock_qty: number;
}

interface CartState {
  cart: CartItem[];
  getQuantity: (id: number) => number;
  addToCart: (item: ProductsType) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      getQuantity: (id) => {
        const item = get().cart.find((p) => p.id === id);
        return item ? item.count : 0;
      },

      addToCart: (item) => {
        const existing = get().cart.find((p) => p.id === item.id);
        if (existing) {
          if (existing.count < item.stock_qty) {
            set((state) => ({
              cart: state.cart.map((p) =>
                p.id === item.id
                  ? { ...p, count: p.count + (item.qty || 1) }
                  : p
              ),
            }));
          }
        } else {
          set((state) => ({
            cart: [...state.cart, { id: item.id, count: 1, stock_qty: item.stock_qty }],
          }));
        }
      },

      inc: (id) => {
        const item = get().cart.find((p) => p.id === id);
        if (item && item.count < item.stock_qty) {
          set((state) => ({
            cart: state.cart.map((p) =>
              p.id === id ? { ...p, count: p.count + 1 } : p
            ),
          }));
        }
      },

      dec: (id) => {
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === id && p.count > 1 ? { ...p, count: p.count - 1 } : p
          ),
        }));
      },

      remove: (id) => {
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart", // same localStorage key as your MobX store
    }
  )
);