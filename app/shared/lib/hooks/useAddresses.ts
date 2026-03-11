import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { queryKeys } from "../query-keys";

interface Address {
  id: number;
  name: string;
  district_id: string;
  street: string;
  house: string;
  apartment: string;
  isDefault: boolean;
}

const addressApi = {
  getAll: () => api.get<Address[]>("/addresses").then((r) => r.data),
  add: (data: Omit<Address, "id" | "isDefault">) =>
    api.post("/addresses", data).then((r) => r.data),
  edit: (id: number, data: Partial<Address>) =>
    api.patch(`/addresses/${id}`, data).then((r) => r.data),
  delete: (id: number) =>
    api.delete(`/addresses/${id}`).then((r) => r.data),
  setDefault: (id: number) =>
    api.patch(`/addresses/${id}/default`).then((r) => r.data),
};

// ── 1. Get all addresses ──────────────────────────────────────────
export function useAddresses() {
  return useQuery({
    queryKey: queryKeys.addresses,
    queryFn: addressApi.getAll,
  });
}

// ── 2. Add address ────────────────────────────────────────────────
export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.add,
    onSuccess: (newAddress) => {
      queryClient.setQueryData<Address[]>(queryKeys.addresses, (old = []) => [
        ...old,
        newAddress,
      ]);
    },
  });
}

// ── 3. Edit address ───────────────────────────────────────────────
export function useEditAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      addressApi.edit(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Address[]>(queryKeys.addresses, (old = []) =>
        old.map((a) => (a.id === updated.id ? updated : a))
      );
    },
  });
}

// ── 4. Delete address ─────────────────────────────────────────────
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => addressApi.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.addresses });
      const previous = queryClient.getQueryData<Address[]>(queryKeys.addresses);
      queryClient.setQueryData<Address[]>(queryKeys.addresses, (old = []) =>
        old.filter((a) => a.id !== id)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.addresses, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
    },
  });
}

// ── 5. Set default address ────────────────────────────────────────
export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => addressApi.setDefault(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.addresses });
      const previous = queryClient.getQueryData<Address[]>(queryKeys.addresses);
      queryClient.setQueryData<Address[]>(queryKeys.addresses, (old = []) =>
        old.map((a) => ({ ...a, isDefault: a.id === id }))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.addresses, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
    },
  });
}