import $api from "../api";

export interface CheckoutItem {
  product_id: number;
  qty: number;
}

export interface CheckoutPayload {
  address_id: number | null;
  payment_method: "cash" | "click";
  items: CheckoutItem[];
  notes?: string;
}

export const orderApi = {
  getOrders: async () => {
    const { data } = await $api.get("/orders");
    return data.data;
  },

  checkout: async (payload: CheckoutPayload) => {
    const { data } = await $api.post("/orders/checkout", payload);
    return data.data;
  },
};