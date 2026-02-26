"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../store";
import { clearCart } from "../store/slices/cartSlice";
import { getAddresses } from "../store/actions/addressesAction";
import { $api } from "../shared/api/api";
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

  console.log(addresses);

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
    if (!initialized) return;

    if (!isAuth) {
      router.replace("/signin");
      return;
    }
  }, [initialized, isAuth, dispatch, router]);

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price ?? 0) * item.qty,
      0,
    );
  }, [cart]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user || !token) {
      alert("Avval tizimga kiring");
      return;
    }

    if (cart.length === 0) {
      alert("Savatingiz bo‘sh");
      return;
    }

    setLoading(true);

    try {
      const res = await $api.post(
        "/orders/checkout",
        {
          address_id: Number(data.address_id),
          payment_method: data.paymentMethod,
          notes: data.comment,
          idempotency_key: crypto.randomUUID(),
          items: cart.map((item) => ({
            product_id: item.id,
            qty: item.qty,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(clearCart());
      router.replace("/profile/orders");
    } catch (err: any) {
      console.error(err?.response?.data || err);
      alert("Buyurtma yaratishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mt-5">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* USER */}
            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-black mb-2">Oluvchi:</h2>
              <p className="text-black text-xl font-semibold">{user?.name}</p>
              <p className="text-black">+998 {user?.phone}</p>
            </div>

            {/* ADDRESS SELECT */}
            <div className="w-full mb-6">
              <h2 className="font-semibold text-black mb-3">
                Yetkazib berish manzili:
              </h2>

              {addressLoading && <p>Manzillar yuklanmoqda...</p>}

              {!addressLoading && (
                // <select
                //   {...register("address_id", {
                //     required: "Manzilni tanlang",
                //   })}
                //   className={`w-full px-4 py-3 border rounded-lg ${
                //     errors.address_id ? "border-red-500" : "border-gray-300"
                //   }`}
                // >
                //   <option value="">Manzilni tanlang</option>

                //   {addresses.map((a: any) => (
                //     <option key={a.id} value={a.id}>
                //       {a.city}, {a.street}
                //     </option>
                //   ))}
                // </select>
                <Select defaultValue="Manzilni tanlang">
                  <SelectTrigger size={"default"} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white" position="popper">
                    <SelectGroup>
                      <SelectItem
                        className="data-[state=checked]:bg-secondary data-[state=checked]:text-black"
                        value="Manzilni tanlang"
                      >
                        Manzilni tanlang
                      </SelectItem>
                      {addresses.map((a: any) => (
                        <SelectItem
                          key={a.id}
                          className="data-[state=checked]:bg-secondary data-[state=checked]:text-black"
                          value={a.id.toString()}
                        >
                          {a.city}, {a.street}
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
              <h2 className="font-semibold text-black mb-3">Mahsulotlar:</h2>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-300"
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
                <span className="text-lg font-bold text-gray-800">Jami:</span>
                <span className="text-lg font-bold text-[#2e3192]">
                  {totalAmount.toLocaleString()} so'm
                </span>
              </div>
            </div>

            {/* COMMENT */}
            <textarea
              {...register("comment")}
              placeholder="Izoh"
              className="w-full p-3 border rounded-lg"
            />

            <div className="mb-6">
              <h2 className="font-semibold text-black mb-3">To'lov usuli:</h2>

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
            <button
              disabled={loading}
              className="w-full bg-[#2e3192] text-white py-4 mt-6 rounded-xl disabled:opacity-50"
            >
              {loading ? "Kutilmoqda..." : "Buyurtma berish"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
