import { createSlice } from "@reduxjs/toolkit";
import { buildBuilder } from "@/app/utils/helpers";
import { getBrands, getCategories, getProducts } from "../actions/productsAction";

const initialState = {
  products: {
    list: [],
    loading: false
  },
  categories: {
    list: [],
    loading: false
  },
  brands: {
    list: [],
    loading: false
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    buildBuilder(builder, getProducts, "products")
    buildBuilder(builder, getCategories, 'categories')
    buildBuilder(builder, getBrands, 'brands')
  }
})

export default productsSlice.reducer