// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getLocale, setLocale } from "../utils/helpers";

type AuthContextType = {
  token: string;
  addToken: (token: string) => void;
  removeToken: () => void; // ✅ Add this
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

function AuthProvider({ children }: { children: ReactNode }) {
  // ✅ Initialize from localStorage (client-side only)
  const [token, setToken] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Hydrate token from localStorage on mount
  useEffect(() => {
    const storedToken = getLocale("token") || "";
    setToken(storedToken);
    setIsHydrated(true);
  }, []);

  function addToken(newToken: string) {
    setToken(newToken);
    setLocale("token", newToken);
  }

  function removeToken() {
    setToken("");
    localStorage.removeItem("token");
  }

  // ✅ Don't render children until hydrated (prevents flash)
  if (!isHydrated) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ token, addToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;