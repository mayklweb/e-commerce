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
    return data.data.map((a: any) => ({
      ...a,
      is_default: Number(a.is_default), // 👈 force number
    })) as Address[];
  },

  add: async (payload: Omit<Address, "id">) => {
    const { data } = await $api.post("/addresses", payload);
    return {
      ...data.data,
      is_default: Number(data.data.is_default),
    } as Address;
  },

  edit: async (id: number, payload: Partial<Address>) => {
    const { data } = await $api.put(`/addresses/${id}`, payload);
    return {
      ...data.data,
      is_default: Number(data.data.is_default),
    } as Address;
  },

  remove: async (id: number) => {
    const { data } = await $api.delete(`/addresses/${id}`);
    return data;
  },

  setDefault: async (id: number) => {
    const { data } = await $api.put(`/addresses/${id}/`);
    return data;
  },
};
