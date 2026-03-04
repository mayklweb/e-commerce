// app/providers/AppInit.tsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { getProducts } from "@/app/store/actions/productsAction";
import { getCategories } from "../store/actions/categoriesAction";
import { getBrands } from "../store/actions/brandsAction";
import { getOrders } from "../store/actions/ordersAction";
import { getAddresses } from "../store/actions/addressesAction";

export const AppInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getOrders());
    dispatch(getAddresses());
  }, [dispatch]);

  return null;
};
