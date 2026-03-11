import { useMemo } from "react";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function useShuffledProducts<T>(data?: T[] | null, limit?: number): T[] {
  return useMemo(() => {
    if (!data || data.length === 0) return [];
    const shuffled = shuffleArray(data);
    return limit ? shuffled.slice(0, limit) : shuffled;
  }, [data, limit]);
}