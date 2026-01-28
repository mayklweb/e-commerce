"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { removeAllProducts } from "../store/slices/cartSlice";
import { getAddresses } from "../store/actions/addressesAction";

interface CheckoutFormData {
  address_id: string;
  comment: string;
  paymentMethod: "cash" | "click" | "payme";
}

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const { addresses, loading: addressLoading } = useSelector(
    (state: RootState) => state.addresses
  );

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      address_id: "",
      comment: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) return alert("Foydalanuvchi topilmadi");

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://api.bunyodoptom.uz/api/v1/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: user.id,
            address_id: Number(data.address_id),
            payment_method: data.paymentMethod,
            notes: data.comment,
            idempotency_key: crypto.randomUUID(),
            items: items.map((item) => ({
              product_id: item.id,
              qty: item.qty,
            })),
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        console.error(result);
        return alert("Buyurtma yaratishda xatolik");
      }

      dispatch(removeAllProducts());
      window.location.href = "/profile/orders";
    } catch (err) {
      console.error(err);
      alert("Server bilan aloqa xatosi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container my-20">
        <h1 className="text-xl lg:text-4xl font-semibold mb-6">SAVAT</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* USER */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p>{user?.name}</p>
            <p>+998 {user?.phone}</p>
          </div>

          {/* ADDRESS */}
          <select
            {...register("address_id", { required: "Manzilni tanlang" })}
            className="w-full mb-4 p-3 border rounded-lg"
          >
            <option value="">Manzilni tanlang</option>
            {addresses.map((a) => (
              <option key={a.id} value={a.id}>
                {a.city}, {a.street}
              </option>
            ))}
          </select>

          {/* CART */}
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>
                {(item.price * item.qty).toLocaleString()} so'm
              </span>
            </div>
          ))}

          <div className="font-bold mt-4">
            Jami: {totalAmount.toLocaleString()} so'm
          </div>

          {/* COMMENT */}
          <textarea
            {...register("comment")}
            placeholder="Izoh"
            className="w-full mt-4 p-3 border rounded-lg"
          />

          {/* PAYMENT */}
          <label className="flex gap-2 mt-4">
            <input
              type="radio"
              value="cash"
              {...register("paymentMethod")}
            />
            Naqd pul
          </label>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-[#2e3192] text-white py-4 mt-6 rounded-xl"
          >
            {loading ? "Kutilmoqda..." : "Buyurtma berish"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
