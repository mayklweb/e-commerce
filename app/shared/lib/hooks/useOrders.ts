import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import $api from "../../api";
import { Order } from "@/app/types";

export const orderKeys = {
  all: ["orders"] as const,
  one: (id: number) => ["orders", id] as const,
};

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: orderKeys.all,
    queryFn: async () => {
      const { data } = await $api.get("/orders");
      return data.data;
    },
  });
}

export function useOrder(id: number) {
  return useQuery<Order>({
    queryKey: orderKeys.one(id),
    queryFn: async () => {
      const { data } = await $api.get(`/orders/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await $api.post(`/orders/${id}/cancel`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}