import { makeAutoObservable } from "mobx";
import { UserType } from "../types";

class AuthStore {
  user: UserType | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }


  setUser(user: UserType) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }

  async login(credentials: UserType) {
    this.loading = true;
    try {
      const res = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      
      const data = await res.json();

      if (data.token) {
        this.setUser(data.data);
      }
      return data;
    } finally {
      this.loading = false;
    }
  }

  async signup(userData: UserType) {
    this.loading = true;
    try {
      const res = await fetch("http://localhost:4000/api/v1/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.token) {
        this.setUser(data.data);
      }
      return data;
    } finally {
      this.loading = false;
    }
  }
}

export const authStore = new AuthStore();
