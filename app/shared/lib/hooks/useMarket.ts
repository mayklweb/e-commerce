import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { queryKeys } from "../query-keys";

interface Market {
  name: string;
  district_id: string;
  address: string;
}

const marketApi = {
  get: () => api.get<Market>("/market").then((r) => r.data),
  update: (data: Partial<Market>) =>
    api.patch("/market", data).then((r) => r.data),
};

export function useMarket() {
  return useQuery({
    queryKey: queryKeys.market,
    queryFn: marketApi.get,
  });
}

export function useUpdateMarket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marketApi.update,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.market });
      const previous = queryClient.getQueryData<Market>(queryKeys.market);
      queryClient.setQueryData<Market>(queryKeys.market, (old) =>
        old ? { ...old, ...data } : old
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.market, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.market });
    },
  });
}