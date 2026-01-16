import { configureStore } from "@reduxjs/toolkit";
import home from "./slices/home";
import product from "./slices/product";
import cart from "./slices/cart";
import orders from "./slices/orders";
import products from "./slices/products";
import modals from "./slices/modals";
import user from "./slices/user";


export const store = configureStore({
  reducer: {
    home,
    product,
    cart,
    orders,
    products,
    modals, 
    user
  }
})

