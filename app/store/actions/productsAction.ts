import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@/app/shared/api/api";
import { brandsList, categoriesList, productsList } from "@/app/utils/urls";

export const getProducts = createAsyncThunk("products/list", async () => {
  let response = await $api.get(productsList);
  return response.data;
});
export const getCategories = createAsyncThunk("categories/list", async () => {
  let response = await $api.get(categoriesList);
  return response.data;
});

export const getBrands = createAsyncThunk("brands/list", async () => {
  let response = await $api.get(brandsList);
  return response.data;
});
