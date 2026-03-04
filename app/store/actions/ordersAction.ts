import { $api } from "@/app/shared/api/api";
import { orderList } from "@/app/utils/urls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk("orders/list", async () => {
  let response = await $api.get(orderList);
  
  return response.data.data;
});
