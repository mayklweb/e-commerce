"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../store";
import { clearCart } from "../store/slices/cartSlice";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CheckoutFormData {
  address_id: string;
  comment: string;
  paymentMethod: "cash" | "click" | "payme";
}

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, token, isAuth, initialized } = useSelector(
    (state: RootState) => state.auth,
  );
  const { cart } = useSelector((state: RootState) => state.cart);
  const { addresses, loading: addressLoading } = useSelector(
    (state: RootState) => state.addresses,
  );

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      address_id: "",
      comment: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    if (!initialized) return;

    if (!isAuth) {
      router.replace("/signin");
      return;
    }
  }, [initialized, isAuth, router]);

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price ?? 0) * item.qty,
      0,
    );
  }, [cart]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      console.log("User is not authenticated");
      return;
    }

    setLoading(true);

    try {
      // Online Payments (click / payme)
      if (data.paymentMethod === "click" || data.paymentMethod === "payme") {
        const res = await fetch(
          "https://api.bunyodoptom.uz/api/v1/click/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              total_amount: Number(totalAmount),
              address_id: data.address_id,
              notes: data.comment,
              payment_method: data.paymentMethod,
              idempotency_key: crypto.randomUUID(),
            }),
          },
        );

        const responseData = await res.json();

        if (!res.ok) {
          console.log("Server error:", responseData);
          alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
          return;
        }

        window.location.href = responseData.paymentUrl;
        return;
      }

      // Cash Payment — Create Order Directly
      if (!data.address_id) {
        alert("Iltimos, yetkazib berish manzilini tanlang!");
        return;
      }

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
            address_id: data.address_id,
            idempotency_key: "",
            notes: data.comment,
            payment_method: data.paymentMethod,
            items: cart.map((item) => ({
              product_id: Number(item.id),
              qty: Number(item.qty),
            })),
          }),
        },
      );

      const responseData = await res.json();

      if (res.ok) {
        alert("Buyurtma muvaffaqiyatli yaratildi!");
        dispatch(clearCart());
        window.location.href = "/profile/orders";
      } else {
        console.log("Order creation error:", responseData);
        alert("Buyurtma yaratishda xatolik yuz berdi");
      }
    } catch (error) {
      console.log("Checkout error:", error);
      alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mt-24 mb-40">
        <div className="container">
          <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* USER */}
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <h2 className="lg:text-xl font-semibold text-black mb-2">Oluvchi:</h2>
                <p className="lg:text-2xl text-black text-xl font-semibold capitalize">{user?.name}</p>
                <p className="lg:text-2xl text-black">+998 {user?.phone}</p>
              </div>

              {/* ADDRESS SELECT */}
              <div className="w-full mb-6">
                <h2 className="lg:text-xl font-semibold text-black mb-3">
                  Yetkazib berish manzili:
                </h2>

                {addressLoading && <p>Manzillar yuklanmoqda...</p>}

                {!addressLoading && (
                  <Select
                    onValueChange={(value) => setValue("address_id", value)}
                  >
                    <SelectTrigger className="w-full text-lg px-3 py-5">
                      <SelectValue placeholder="Manzilni tanlang" />
                    </SelectTrigger>

                    <SelectContent className="bg-white">
                      <SelectGroup>
                        {addresses.map((a: any) => (
                          <SelectItem
                            key={a.id}
                            value={String(a.id)}
                            className="text-lg px-2 py-2 data-[state=checked]:bg-secondary data-[state=checked]:text-black"
                          >
                            {a.region}, {a.city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}

                {errors.address_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address_id.message}
                  </p>
                )}
              </div>

              {/* CART */}
              {/* CART ITEMS */}
              <div className="mb-6">
                <h2 className="lg:text-xl font-semibold text-black mb-3">Mahsulotlar:</h2>

                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 border-b border-gray-300"
                    >
                      <span className="text-gray-700">
                        {item.name} x {item.qty}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {(Number(item.price) * item.qty).toLocaleString()} so'm
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-gray-500">
                    <span className="text-lg lg:text-xl font-bold text-gray-800">
                      Jami:
                    </span>
                    <span className="text-lg lg:text-xl font-bold text-[#2e3192]">
                      {totalAmount.toLocaleString()} so'm
                    </span>
                  </div>
                </div>
              </div>

              {/* COMMENT */}
              <textarea
                {...register("comment")}
                placeholder="Izoh"
                className="w-full p-3 border rounded-lg"
              />

              <div className="mb-6">
                <h2 className="lg:text-xl font-semibold text-black mb-3">To'lov usuli:</h2>

                <div className="space-y-3">
                  {/* CASH */}
                  <label className="flex items-center p-4 rounded-xl cursor-pointer bg-[#2e3192]/10">
                    <input
                      type="radio"
                      {...register("paymentMethod", {
                        required: "To'lov usulini tanlang",
                      })}
                      value="cash"
                      className="w-5 h-5"
                    />
                    <div className="ml-3">
                      <span className="font-semibold text-gray-800">
                        Naqd pul
                      </span>
                      <p className="text-sm text-gray-600">
                        Yetkazib berilganda to'lash
                      </p>
                    </div>
                  </label>

                  {/* CLICK */}
                  <label className="flex items-center p-4 rounded-xl bg-[#2e3192]/10 opacity-50">
                    <input
                      type="radio"
                      {...register("paymentMethod")}
                      value="click"
                      disabled
                    />
                    <div className="ml-3">
                      <Image
                        src="/click.svg"
                        alt="click"
                        width={100}
                        height={25}
                      />
                    </div>
                  </label>

                  {/* PAYME */}
                  <label className="flex items-center p-4 rounded-xl bg-[#2e3192]/10 opacity-50">
                    <input
                      type="radio"
                      {...register("paymentMethod")}
                      value="payme"
                      disabled
                    />
                    <div className="ml-3">
                      <Image
                        src="/payme.svg"
                        alt="payme"
                        width={100}
                        height={32}
                      />
                    </div>
                  </label>
                </div>

                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <div className="w-full lg:hidden bg-white px-4 py-3 rounded-t-2xl border-b fixed  bottom-19 left-0 z-10 shadow-[0px_-1px_6px_0px_rgba(0,0,0,0.1)]">
                <button
                  disabled={loading}
                  className="w-full bg-[#2e3192] text-white py-3 rounded-xl disabled:opacity-50 "
                >
                  {loading ? "Kutilmoqda..." : "Buyurtma berish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
