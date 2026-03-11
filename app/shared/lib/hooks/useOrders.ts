import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { api } from "../api";

interface Order {
  id: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
  items: { name: string; image: string; quantity: number; price: number }[];
}

const ordersApi = {
  getAll: (page: number) =>
    api.get<{ data: Order[]; nextPage: number | null }>("/orders", { params: { page } }).then((r) => r.data),
  getOne: (id: string) =>
    api.get<Order>(`/orders/${id}`).then((r) => r.data),
  cancel: (id: string) =>
    api.patch(`/orders/${id}/cancel`).then((r) => r.data),
  create: (payload: { address_id: string; items: { product_id: number; quantity: number }[] }) =>
    api.post("/orders", payload).then((r) => r.data),
};

// ── 1. Infinite scroll pagination ────────────────────────────────
export function useOrders() {
  return useInfiniteQuery({
    queryKey: queryKeys.orders,
    queryFn: ({ pageParam = 1 }) => ordersApi.getAll(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}

// ── 2. Single order detail ────────────────────────────────────────
export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => ordersApi.getOne(id),
    enabled: !!id, // only fetch if id exists
  });
}

// ── 3. Cancel order ───────────────────────────────────────────────
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersApi.cancel(id),
    onSuccess: (_data, id) => {
      // Update single order cache
      queryClient.setQueryData<Order>(queryKeys.order(id), (old) =>
        old ? { ...old, status: "cancelled" } : old
      );
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
}

// ── 4. Create order ───────────────────────────────────────────────
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.create,
    onSuccess: () => {
      // Invalidate orders list and clear cart
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.setQueryData(queryKeys.cart, { items: [], total: 0 });
    },
  });
}