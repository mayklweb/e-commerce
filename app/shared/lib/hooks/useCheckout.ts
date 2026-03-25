import $api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/app/store/CartStore";

interface CheckoutProduct {
  id: number;
  name: string;
  price: number;
  qty: number;
  images?: any[];
  [key: string]: any;   // ✅ all other product fields
}

interface CheckoutPayload {
  user_id: number
  address_id:  number | null;
  market_id:   number | null;   // ✅ added
  payment:     "cash" | "click";
  payment_method:     "cash" | "click";
  payed:       boolean;
  products:    CheckoutProduct[];
  notes?:      string;
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