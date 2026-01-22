import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBrands } from "../actions/brandsAction";

interface Brands {
  id: number;
  name: string;
  // add fields based on your API
}

interface BrandsState {
  brands: Brands[];
  loading: boolean;
}

const initialState: BrandsState = {
  brands: [],
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
        (state, action: PayloadAction<Brands[]>) => {
          state.loading = false;
          state.brands = action.payload;
        },
      )
      .addCase(getBrands.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default brandsSlice.reducer;
