import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "../actions/ordersAction";
import { OrderType } from "@/app/utils/types";

interface OrdersState {
  orders: OrderType[];
  loading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<OrderType[]>) => {
          state.loading = false;
          state.orders = action.payload;
        },
      )
      .addCase(getOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;