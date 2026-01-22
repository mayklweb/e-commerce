import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  phone: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },

    hydrateAuth(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setAuth, hydrateAuth, logout } = authSlice.actions;
export default authSlice.reducer;
