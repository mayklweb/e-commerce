"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!token) {
      router.replace("/signin");
    }
  }, [token]);

  if (!token) return null;

  return children;
}
