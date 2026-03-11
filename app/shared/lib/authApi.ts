import $api from "../api";

export const authApi = {
  signup: async (payload: {
    name: string;
    phone: string;
    password: string;
  }) => {
    const { data } = await $api.post("/users/signup", payload);
    return data; // { user, token }
  },

  login: async (creds: { phone: string; password: string }) => {
    const { data } = await $api.post("/users/login", creds);
    return {
      user: data.data, // 👈 unwrap the nested data
      token: data.token,
    };
  },

  logout: async () => {
    await $api.post("/api/logout");
  },

  updateProfile: async (payload: { name: string; phone: string }) => {
    const token = localStorage.getItem("token");
    const { data } = await $api.put("/users/me", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data; // updated user
  },

  getMe: async () => {
    const token = localStorage.getItem("token");
    const { data } = await $api.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data; // your user object
  },
};
