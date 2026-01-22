import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/app/shared/api/api";
import { productsList } from "@/app/utils/urls";

export const getProducts = createAsyncThunk("products/list", async () => {
  let response = await $api.get(productsList);
  return response.data.data;
});

