import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../productsApi";

export const productKeys = {
  all: ["products"] as const,
  one: (id: number) => ["products", id] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: productsApi.getAll,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.one(id),
    queryFn: () => productsApi.getOne(id),
    enabled: !!id, // only fetch if id exists
  });
}