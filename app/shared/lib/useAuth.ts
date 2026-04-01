import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./authApi";
import { queryKeys } from "./query-keys";
import type { UserType } from "../../types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

// ─── READ: replaces isAuth, user, initialized ───────────────────────────────

export function useGetMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.getMe,
    onSuccess: (user) => {
      // console.log("getMe success:", user); // 👈 what does this print?
      queryClient.setQueryData(queryKeys.user, user);
      // console.log("cache after set:", queryClient.getQueryData(queryKeys.user)); // 👈 and this?
    },
  });
}

export function useUser() {
  // Read user from localStorage on mount
  const initialUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  return useQuery<UserType | null>({
    queryKey: queryKeys.user,
    queryFn: () => null,
    staleTime: Infinity,
    retry: false, // Changed from true
    enabled: false,
    initialData: initialUser, // ✅ Initialize from localStorage
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const { addToken } = useAuth(); // ✅ Import from context

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      addToken(token); // ✅ Sync with context
      queryClient.setQueryData(queryKeys.user, user);
    },
  });
}

// ─── LOGIN: replaces setAuth ─────────────────────────────────────────────────

export function useLogin() {
  const queryClient = useQueryClient();
  const { addToken } = useAuth(); // ✅ Import from context

  return useMutation<
    { user: UserType; token: string },
    Error,
    { phone: string; password: string }
  >({
    mutationFn: authApi.login,
    onSuccess: ({ user, token }: { user: UserType; token: string }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      addToken(token); // ✅ Sync with context
      queryClient.setQueryData(queryKeys.user, user);
    },
  });
}

// ─── LOGOUT: replaces logout ─────────────────────────────────────────────────
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { removeToken } = useAuth(); // ✅ Get removeToken from context

  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      removeToken(); // ✅ Clear context token
      queryClient.setQueryData(queryKeys.user, null);
      router.replace("/login");
    },
  });
}

// ─── UPDATE PROFILE: replaces updateProfile thunk + extraReducers ────────────

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (updatedUser) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      queryClient.setQueryData(queryKeys.user, updatedUser); // sync cache
    },
  });
}
