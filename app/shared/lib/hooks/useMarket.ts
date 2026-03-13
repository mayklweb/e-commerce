import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { marketApi, Market } from "../marketApi";

export const marketKeys = {
  all: ["markets"] as const,
  one: (id: number) => ["markets", id] as const,
};

export function useMarkets() {
  return useQuery({
    queryKey: marketKeys.all,
    queryFn: marketApi.getAll,
  });
}

export function useMarket(id: number) {
  return useQuery({
    queryKey: marketKeys.one(id),
    queryFn: () => marketApi.getOne(id),
    enabled: !!id,
  });
}

export function useCreateMarket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: marketApi.create,
    onSuccess: (newMarket) => {
      queryClient.setQueryData<Market[]>(marketKeys.all, (old = []) => [
        ...old,
        newMarket,
      ]);
    },
  });
}

export function useUpdateMarket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Market> }) =>
      marketApi.update(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Market[]>(marketKeys.all, (old = []) =>
        old.map((m) => (m.id === updated.id ? updated : m))
      );
    },
  });
}

export function useDeleteMarket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => marketApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: marketKeys.all });
      const previous = queryClient.getQueryData<Market[]>(marketKeys.all);
      queryClient.setQueryData<Market[]>(marketKeys.all, (old = []) =>
        old.filter((m) => m.id !== id)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(marketKeys.all, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: marketKeys.all });
    },
  });
}