import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./authApi";
import { queryKeys } from "./query-keys";
import type { UserType } from "../../types";

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
  return useQuery<UserType | null>({
    queryKey: queryKeys.user,
    queryFn: () => null,
    staleTime: Infinity,
    retry: true,
    enabled: false,
    initialData: null,
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.setQueryData(queryKeys.user, user);
    },
  });
}

// ─── LOGIN: replaces setAuth ─────────────────────────────────────────────────

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<
    { user: UserType; token: string },
    Error,
    { phone: string; password: string }
  >({
    mutationFn: authApi.login,
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.setQueryData(queryKeys.user, user); // instantly update cache
    },
  });
}

// ─── LOGOUT: replaces logout ─────────────────────────────────────────────────

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      queryClient.setQueryData(queryKeys.user, null); // wipe user from cache
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
