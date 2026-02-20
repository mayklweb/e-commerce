import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateProfile } from "../actions/updateProfileAction";

interface User {
  id: number;
  name: string;
  phone: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  initialized: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  loading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      state.initialized = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },

    hydrateAuth(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },

    markInitialized: (state) => {
      state.initialized = true; // ✅ initialized true qilamiz, user bo‘lmasa ham
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.initialized = true;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setAuth, hydrateAuth, logout, markInitialized } = authSlice.actions;
export default authSlice.reducer;
