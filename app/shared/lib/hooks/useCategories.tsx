import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../categoriesApi";

export const categoriesKeys = {
  all: ["Categories"] as const,
  one: (id: number) => ["categories", id] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.all,
    queryFn: categoriesApi.getAll,
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoriesKeys.one(id),
    queryFn: () => categoriesApi.getOne(id),
    enabled: !!id, // only fetch if id exists
  });
}
