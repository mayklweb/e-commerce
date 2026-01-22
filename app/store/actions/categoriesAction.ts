import { $api } from "@/app/shared/api/api";
import { categoriesList } from "@/app/utils/urls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk("categories/list", async () => {
  let response = await $api.get(categoriesList);
  
  return response.data;
});
