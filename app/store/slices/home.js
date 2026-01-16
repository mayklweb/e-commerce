import { createSlice } from "@reduxjs/toolkit";
import { getBannerList, getCategoriesList, getCategoryRecommendedList, getCategoryRecommendedProducts, getProductOffersList, getProductsRecommendedList } from "../actions/homeActions";
import { buildBuilder } from "../../utils/helpers";

const initialState = {
  categories: {
    list: [],
    loading: false
  },
  banners: {
    list: [],
    loading: false
  },
  productsOffers: {
    list: [],
    loading: false
  },
  productsRecommended: {
    list: [],
    loading: false
  },
  categoryRecommended: {
    list: [],
    loading: false
  },
  categoryRecommendedProducts: {
    list: [],
    loading: false
  }
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    buildBuilder(builder, getCategoriesList, 'categories')
    buildBuilder(builder, getBannerList, 'banners')
    buildBuilder(builder, getProductsRecommendedList, 'productsRecommended')
    buildBuilder(builder, getProductOffersList, 'productsOffers')
    buildBuilder(builder, getCategoryRecommendedList , 'categoryRecommended')
    buildBuilder(builder, getCategoryRecommendedProducts , 'categoryRecommendedProducts')
  }
})

export default homeSlice.reducer

