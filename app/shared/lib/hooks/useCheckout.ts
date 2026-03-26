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
  user_id: number;                    // ✅ integer (not string!)
  total_amount: number;               // ✅ REQUIRED - you were missing this
  market_id: number | null;
  address_id: number | null;
  payment_status?: "pending" | "paid" | "failed" | "refunded";  // optional, defaults to "pending"
  payment_method: "cash" | "click";
  payed?: boolean;                    // optional, defaults to true
  status?: "pending" | "preparing" | "delivered" | "cancelled";  // optional, defaults to "preparing"
  idempotency_key?: string | null;
  notes?: string | null;
  products: CheckoutProduct[];
}

export function useCheckout() {
  const { clearCart } = useCartStore();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      // 🔍 LOG THE PAYLOAD
      console.log("📤 Checkout payload:", JSON.stringify(payload, null, 2));
      
      try {
        const { data } = await $api.post("/orders/checkout", payload);
        return data;
      } catch (error: any) {
        // 🔍 LOG THE SERVER ERROR
        console.error("❌ Server error response:", error.response?.data);
        throw error;
      }
    },
    onSuccess: () => {
      clearCart();
    },
  });
}