import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productsAction";
import { ProductsType } from "@/app/utils/types";

// interface Products {
//   id: number;
//   name: string;
//   price: string;
//   brand_id?: number;
//   category_id?: number;
//   description: string;
//   images?: string[];
//   status: string;
//   stock_qty: number;
// }


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
