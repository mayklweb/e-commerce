import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductsType } from "@/app/types";

interface FavoritesState {
  favorites: ProductsType[];
  addFavorite: (product: ProductsType) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (product: ProductsType) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== id),
        })),

      toggleFavorite: (product) => {
        const isFav = get().isFavorite(product.id);
        isFav ? get().removeFavorite(product.id) : get().addFavorite(product);
      },

      isFavorite: (id) => get().favorites.some((p) => p.id === id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage", // persists to localStorage
    }
  )
);