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
