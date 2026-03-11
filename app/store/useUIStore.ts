import { create } from "zustand";

type Modal = "addAddress" | "editAddress" | "orderDetail" | "checkout" | null;

interface UIStore {
  // Modals
  activeModal: Modal;
  modalData: unknown;
  openModal: (modal: Modal, data?: unknown) => void;
  closeModal: () => void;

  // Sidebar / bottom sheet
  sidebarOpen: boolean;
  activeNav: string;
  setSidebarOpen: (open: boolean) => void;
  setActiveNav: (nav: string) => void;

  // Global loading
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Modals
  activeModal: null,
  modalData: null,
  openModal: (modal, data = null) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  // Sidebar
  sidebarOpen: false,
  activeNav: "profile",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveNav: (nav) => set({ activeNav: nav }),

  // Loading
  isPageLoading: false,
  setPageLoading: (loading) => set({ isPageLoading: loading }),
}));