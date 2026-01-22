import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productsAction";

interface Products {
  id?: number;
  title?: string;
  price?: number;
  // add fields based on your API
}

interface ProductsState {
  products: Products | null;
  loading: boolean;
}

const initialState: ProductsState = {
  products: null,
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
        (state, action: PayloadAction<Products | Products[]>) => {
          state.loading = false;

          // ✅ handle both array or single object safely
          if (Array.isArray(action.payload)) {
            state.products = action.payload[0] ?? null;
          } else {
            state.products = action.payload;
          }
        },
      )
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
