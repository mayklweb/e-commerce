import { createSlice } from "@reduxjs/toolkit";
import { getBrands, getCategories, getProducts } from "../actions/productsActions";
import { buildBuilder } from "../../utils/helpers";

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
  extraReducers: (builder) => {
    buildBuilder(builder, getProducts, "products")
    buildBuilder(builder, getCategories, 'categories')
    buildBuilder(builder, getBrands, 'brands')
  }
})

export default productsSlice.reducer