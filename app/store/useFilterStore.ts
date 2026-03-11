import { create } from "zustand";

interface FilterStore {
  search: string;
  categoryId: number | null;
  sortBy: "price_asc" | "price_desc" | "newest" | null;
  minPrice: number;
  maxPrice: number;

  setSearch: (search: string) => void;
  setCategory: (id: number | null) => void;
  setSort: (sort: FilterStore["sortBy"]) => void;
  setPriceRange: (min: number, max: number) => void;
  resetFilters: () => void;
}

const defaultFilters = {
  search: "",
  categoryId: null,
  sortBy: null,
  minPrice: 0,
  maxPrice: 999999999,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultFilters,

  setSearch: (search) => set({ search }),
  setCategory: (categoryId) => set({ categoryId }),
  setSort: (sortBy) => set({ sortBy }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  resetFilters: () => set(defaultFilters),
}));