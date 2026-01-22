import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productsAction";

interface Products {
  id: number;
  name: string;
  price: number;
  images: { url: string }[];

  // add fields based on your API
}

interface ProductsState {
  products: Products[];
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
        (state, action: PayloadAction<Products[]>) => {
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
