import $api from "../api";

export const categoriesApi = {
  getAll: async () => {
    const { data } = await $api.get("/categories");
    return data.data;
  },
};