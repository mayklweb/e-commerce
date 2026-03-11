export const queryKeys = {
  user: ["auth", "user"] as const,
  cart: ["cart"] as const,
  orders: ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
  addresses: ["addresses"] as const,
  market: ["market"] as const,
};
