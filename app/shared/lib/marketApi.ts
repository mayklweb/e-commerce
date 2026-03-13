import $api from "../api";

export interface Market {
  id: number;
  name: string;
  region: string;
  district: string;
  address: string;
  user_id: number;
}

export const marketApi = {
  getAll: async () => {
    const { data } = await $api.get("/markets");
    return data.data as Market[];
  },

  getOne: async (id: number) => {
    const { data } = await $api.get(`/markets/${id}`);
    return data.data as Market;
  },

  create: async (payload: Omit<Market, "id" | "user_id">) => {
    const { data } = await $api.post("/markets", payload);
    return data.data as Market;
  },

  update: async (id: number, payload: Partial<Market>) => {
    const { data } = await $api.put(`/markets/${id}`, payload);
    return data.data as Market;
  },

  remove: async (id: number) => {
    const { data } = await $api.delete(`/markets/${id}`);
    return data;
  },
};