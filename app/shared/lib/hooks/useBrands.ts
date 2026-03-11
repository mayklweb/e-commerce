import { useQuery } from "@tanstack/react-query";
import { brandsApi } from "../brandsApi";

export const brandsKeys = {
  all: ["brands"] as const,
  one: (id: number) => ["brands", id] as const,
};

export function useBrands() {
  return useQuery({
    queryKey: brandsKeys.all,
    queryFn: brandsApi.getAll,
  });
}

export function useBategory(id: number) {
  return useQuery({
    queryKey: brandsKeys.one(id),
    queryFn: () => brandsApi.getOne(id),
    enabled: !!id, // only fetch if id exists
  });
}
