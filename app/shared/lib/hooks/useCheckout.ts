import $api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/app/store/CartStore";

interface CheckoutPayload {
  address_id: number | null;
  payment_method: "cash" | "click";
  notes: string;
  items: { product_id: number; qty: number }[];
}

export function useCheckout() {
  const { clearCart } = useCartStore();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const { data } = await $api.post("/orders/checkout", payload);
      return data;
    },
    onSuccess: () => {
      clearCart();
    },
  });
}
