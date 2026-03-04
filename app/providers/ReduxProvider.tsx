"use client";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "../store";
import { useEffect } from "react";
import { hydrateAuth, markInitialized } from "../store/slices/authSlice";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { getBrands } from "../store/actions/brandsAction";
import { getProducts } from "../store/actions/productsAction";
import { getCategories } from "../store/actions/categoriesAction";
import { getOrders } from "../store/actions/ordersAction";
import { getAddresses } from "../store/actions/addressesAction";
import { AppInit } from "./AppInit";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setupStatusBar = async () => {
      if (Capacitor.getPlatform() !== "web") {
        await StatusBar.setOverlaysWebView({ overlay: false });
      }
    };

    setupStatusBar();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      store.dispatch(
        hydrateAuth({
          user: JSON.parse(user),
          token,
        }),
      );
    } else {
      store.dispatch(markInitialized()); // MUHIM
    }
  }, []);

  return (
    <Provider store={store}>
      <AppInit />
      {children}
    </Provider>
  );
}
