import { $api } from "@/app/shared/api/api";
import { addressList } from "@/app/utils/urls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAddresses = createAsyncThunk("addresses/list", async () => {
  let response = await $api.get(addressList);
  
  return response.data.data;
});
