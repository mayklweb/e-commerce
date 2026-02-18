import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/app/shared/api/api";
import { productsList } from "@/app/utils/urls";

export const getProductsById = createAsyncThunk("products/list", async (id: string) => {
  let response = await $api.get(`${productsList}/${id}`);
  return response.data.data;
});

