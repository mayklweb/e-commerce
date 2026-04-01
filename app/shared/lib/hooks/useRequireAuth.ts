// lib/hooks/useRequireAuth.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/shared/lib/useAuth";
import useIsAuth from "@/app/context/useIsAuth";

export function useRequireAuth() {
  const { data: user, isLoading } = useUser();
  const isAuth = useIsAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ Only redirect if: not loading AND no token AND no user
    if (!isLoading && !isAuth && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, isAuth, router]);

  return { user, isLoading };
}