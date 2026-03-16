import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoryStore {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number) => void;
  clearSelectedCategoryId: () => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      selectedCategoryId: null,
      setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
      clearSelectedCategoryId: () => set({ selectedCategoryId: null }),
    }),
    {
      name: "category-store",
    }
  )
);