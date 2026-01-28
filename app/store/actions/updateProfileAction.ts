import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    data: { name: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://api.bunyodoptom.uz/api/v1/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result);
      }

      return result.data; // updated user
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
