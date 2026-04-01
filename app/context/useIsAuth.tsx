// context/useIsAuth.ts
import { useMemo } from "react";
import { useAuth } from "./AuthContext";

function useIsAuth() {
  const { token } = useAuth();

  return useMemo(() => {
    return !!token && token.trim().length > 0;
  }, [token]);
}

export default useIsAuth;