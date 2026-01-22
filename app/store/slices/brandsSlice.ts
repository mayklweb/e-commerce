import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBrands } from "../actions/brandsAction";

interface Brands {
  id?: number;
  title?: string;
  price?: number;
  // add fields based on your API
}

interface BrandsState {
  brands: Brands | null;
  loading: boolean;

}

const initialState: BrandsState = {
  brands: null,
  loading: false,

};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getBrands.fulfilled,
        (state, action: PayloadAction<Brands | Brands[]>) => {
          state.loading = false;

          // ✅ handle both array or single object safely
          if (Array.isArray(action.payload)) {
            state.brands = action.payload[0] ?? null;
          } else {
            state.brands = action.payload;
          }
        }
      )
      .addCase(getBrands.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default brandsSlice.reducer;
