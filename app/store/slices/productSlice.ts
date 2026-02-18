import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductsById } from "../actions/productAction";
import { ProductType } from "@/app/utils/types";

interface ProductState {
  product: ProductType | null;
  loading: boolean;
}

const initialState: ProductState = {
  product: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProductsById.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(getProductsById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
