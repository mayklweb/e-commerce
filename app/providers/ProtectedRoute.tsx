"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TOKEN_LOCALSTORAGE_KEY } from "../shared/const/localstorage";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);

    if (!token) {
      router.replace("/signin");
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) return null;

  return children;
}