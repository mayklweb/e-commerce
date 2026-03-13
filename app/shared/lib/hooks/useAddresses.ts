import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, addressApi } from "../addressesApi";

export const addressKeys = {
  all: ["addresses"] as const,
  one: (id: number) => ["addresses", id] as const,
};

export function useAddresses() {
  return useQuery({
    queryKey: addressKeys.all,
    queryFn: addressApi.getAll,
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addressApi.add,
    onSuccess: (newAddress) => {
      queryClient.setQueryData<Address[]>(addressKeys.all, (old = []) => [
        ...old,
        newAddress,
      ]);
    },
  });
}

export function useEditAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      addressApi.edit(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Address[]>(addressKeys.all, (old = []) =>
        old.map((a) => (a.id === updated.id ? updated : a)),
      );
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addressApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: addressKeys.all });
      const previous = queryClient.getQueryData<Address[]>(addressKeys.all);
      queryClient.setQueryData<Address[]>(addressKeys.all, (old = []) =>
        old.filter((a) => a.id !== id),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(addressKeys.all, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addressApi.setDefault(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: addressKeys.all });
      const previous = queryClient.getQueryData<Address[]>(addressKeys.all);
      queryClient.setQueryData<Address[]>(addressKeys.all, (old = []) =>
        old.map((a) => ({ ...a, is_default: a.id === id })),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(addressKeys.all, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
    },
  });
}
