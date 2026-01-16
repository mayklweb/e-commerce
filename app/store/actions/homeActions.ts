import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../api";
import { bannersList, categoriesList, categoryRecommendedList, productOffersList, productsRecommendedList, recommendedCategoryProductsList } from "../../utils/urls";


export const getCategoriesList = createAsyncThunk('catedories/list', async () => {
  let response = await Axios.get(categoriesList)
  return response.data
})

export const getBannerList = createAsyncThunk('banner/list', async () => {
  let response = await Axios.get(bannersList)
  return response.data
})
export const getProductsRecommendedList = createAsyncThunk('products/recommended', async () => {
  let response = await Axios.get(productsRecommendedList)
  return response.data
})
export const getProductOffersList = createAsyncThunk('product/offers', async () => {
  let response = await Axios.get(productOffersList)
  return response.data
})
export const getCategoryRecommendedList = createAsyncThunk('category/recommended', async () => {
  let response = await Axios.get(categoryRecommendedList)
  return response.data
})
export const getCategoryRecommendedProducts = createAsyncThunk('category/products', async (arr) => {
  let response = await Axios.get(recommendedCategoryProductsList(arr))
  return response.data
})