import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productsAction";
import { ProductsType } from "@/app/utils/types";

interface ProductsState {
  products: ProductsType[];
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ProductsType[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
 