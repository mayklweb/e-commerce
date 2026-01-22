import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../actions/categoriesAction";

interface Categories {
  id: number;
  name: string;
}

interface CategoriesState {
  categories: Categories[];
  loading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
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
        (state, action: PayloadAction<Categories[]>) => {
          state.loading = false;

          // ✅ handle both array or single object safely
          if (Array.isArray(action.payload)) {
            state.categories = action.payload;
          } else {
            state.categories = action.payload;
          }
        },
      )
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;
