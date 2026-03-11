import $api from "../api";

export const productsApi = {
  getAll: async () => {
    const { data } = await $api.get("/products");
    return data.data;
  },

  getOne: async (id: number) => {
    const { data } = await $api.get(`/products/${id}`);
    return data.data;
  },
};