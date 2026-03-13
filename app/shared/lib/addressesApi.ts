import $api from "../api";

export interface Address {
  id: number;
  region: string;
  district: string;
  address: string;
  is_default: boolean;
}

export const addressApi = {
  getAll: async () => {
    const { data } = await $api.get("/addresses");
    return data.data as Address[];
  },

  add: async (payload: Omit<Address, "id" | "is_default">) => {
    const { data } = await $api.post("/addresses", payload);
    return data.data as Address;
  },

  edit: async (id: number, payload: Partial<Address>) => {
    const { data } = await $api.patch(`/addresses/${id}`, payload);
    return data.data as Address;
  },

  remove: async (id: number) => {
    const { data } = await $api.delete(`/addresses/${id}`);
    return data;
  },

  setDefault: async (id: number) => {
    const { data } = await $api.patch(`/addresses/${id}/default`);
    return data;
  },
};