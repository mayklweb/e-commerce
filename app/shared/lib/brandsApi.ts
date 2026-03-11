import $api from "../api";

export const brandsApi = {
  getAll: async () => {
    const { data } = await $api.get("/brands");
    return data.data;
  },

  getOne: async (id: number) => {
    const { data } = await $api.get(`/brands/${id}`);
    return data.data;
  },
};