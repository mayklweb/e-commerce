import { create } from "zustand";

// This is only for UI state of the cart
// Actual cart data comes from TanStack Query (useCart hook)
interface CartUIStore {
  selectedIds: number[];       // checked item ids
  selectedAddressId: string;

  toggleItem: (id: number) => void;
  toggleAll: (ids: number[]) => void;
  setSelectedAddress: (id: string) => void;
  clearSelection: () => void;
}

export const useCartStore = create<CartUIStore>((set, get) => ({
  selectedIds: [],
  selectedAddressId: "",

  toggleItem: (id) => {
    const { selectedIds } = get();
    set({
      selectedIds: selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id],
    });
  },

  toggleAll: (ids) => {
    const { selectedIds } = get();
    const allSelected = ids.every((id) => selectedIds.includes(id));
    set({ selectedIds: allSelected ? [] : ids });
  },

  setSelectedAddress: (id) => set({ selectedAddressId: id }),
  clearSelection: () => set({ selectedIds: [], selectedAddressId: "" }),
}));