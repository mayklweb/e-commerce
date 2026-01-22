"use client";

import { Provider } from "react-redux";
import InitAuth from "../widgets/InitAuth/InitAuth";
import { store } from "../store";
import { useEffect } from "react";
import { hydrateAuth } from "../store/slices/authSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    }
  }, []);
  return (
    <Provider store={store}>
      {/* <InitAuth /> */}
      {children}
    </Provider>
  );
}
