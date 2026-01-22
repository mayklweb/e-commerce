import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../actions/categoriesAction";

interface Categories {
  id?: number;
  title?: string;
  price?: number;
  // add fields based on your API
}

interface CategoriesState {
  categories: Categories | null;
  loading: boolean;

}

const initialState: CategoriesState = {
  categories: null,
  loading: false,

};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Categories | Categories[]>) => {
          state.loading = false;

          // ✅ handle both array or single object safely
          if (Array.isArray(action.payload)) {
            state.categories = action.payload[0] ?? null;
          } else {
            state.categories = action.payload;
          }
        }
      )
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;
