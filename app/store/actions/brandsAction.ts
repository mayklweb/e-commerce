import { $api } from "@/app/shared/api/api";
import { brandsList } from "@/app/utils/urls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBrands = createAsyncThunk("brands/list", async () => {
  let response = await $api.get(brandsList);
  
  return response.data;
});
