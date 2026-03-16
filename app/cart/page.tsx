"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../store/CartStore";
import {
  CartIcon,
  CheckIcon,
  DeleteIcon,
  MinusIcon,
  PlusIcon,
} from "../shared/icons";
import { useEffect, useState } from "react";
import { useAddresses } from "../shared/lib/hooks/useAddresses";
import { useCheckout } from "../shared/lib/hooks/useCheckout";
import { useUser } from "../shared/lib/useAuth";

type PaymentMethod = "cash" | "click";

function Cart() {
  const {
    cart,
    changeQty,
    remove,
    toggleAll,
    toggleItem,
    allSelected,
    selectedItems,
    total,
    totalCount,
    selectedIds,
  } = useCartStore();

  const {data: user} = useUser()
  const { data: addresses } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const { mutate: checkout, isPending } = useCheckout();

  useEffect(() => {
    if (addresses && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.is_default);
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses]);

  function handleCheckout() {
    const products = selectedItems().map((item) => ({
      ...item, // ✅ all product fields (id, name, price, images, etc.)
      qty: item.count, // ✅ qty from cart count
    }));

    checkout({
      address_id: selectedAddressId,
      market_id: null, // ✅ from useUser()
      payment: paymentMethod,
      payment_method: paymentMethod,
      payed: false,
      products,
      notes: "",
    });
  }

  const canCheckout = selectedItems().length > 0 && !isPending;

  return (
    <section>
      <div className="container">
        <div className="w-full h-full flex flex-col mt-24">
          {/* Page header */}
          <div className="hidden lg:block mb-5">
            <h1 className="text-2xl font-semibold">Savat</h1>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                <CartIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold">Savat bo'sh</h3>
              <p className="text-gray-500 text-base">
                Hozircha savatda mahsulot yo'q.
                <br /> Xarid qilishni boshlang!
              </p>
              <Link
                href={"/categories"}
                className="text-white px-6 py-3 font-semibold rounded-xl bg-primary"
              >
                Xaridni boshlash
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-start gap-5">
              {/* ── Cart items ── */}
              <div className="w-full lg:w-7/10 flex flex-col lg:flex-col gap-5">
                <div
                  className="flex items-center gap-3 cursor-pointer select-none bg-accent p-4 rounded-xl"
                  onClick={toggleAll}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      allSelected()
                        ? "bg-primary border-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {allSelected() && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-black">
                    Tanlangan: {selectedItems().length} ta mahsulot
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-xl p-2 flex flex-col gap-2 shadow-sm transition-all ${
                        selectedIds.includes(item.id)
                          ? "bg-secondary/10"
                          : "bg-[#E5E6FF]"
                      }`}
                    >
                      <div className="w-full flex gap-2">
                        {/* Image */}
                        <div className="w-25 h-18.5 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                          <Image
                            src={
                              typeof item.images?.[0] === "string"
                                ? item.images?.[0]
                                : item.images?.[0]?.url || "/product.jpg"
                            }
                            alt={item.name}
                            width={300}
                            height={225}
                          />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <p className="text-sm sm:text-lg font-semibold text-gray-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">
                            {(item.price * item.count).toLocaleString()} so'm
                          </p>
                        </div>
                        {/* Checkbox */}
                        <div
                          className="cursor-pointer shrink-0"
                          onClick={() => toggleItem(item.id)}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                              selectedIds.includes(item.id)
                                ? "bg-primary border-primary"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {selectedIds.includes(item.id) && (
                              <CheckIcon className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border border-solid border-accent" />

                      {/* Qty + Remove */}
                      <div className="flex gap-4 items-center justify-end">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-1 py-1">
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
                          >
                            <MinusIcon className="w-5 h-5" />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center">
                            {item.count}
                          </span>
                          <button
                            onClick={() => changeQty(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
                          >
                            <PlusIcon className="w-5 h-5" />
                          </button>
                        </div>

                        <button
                          onClick={() => remove(item.id)}
                          className="flex items-center text-sm font-medium gap-2 px-2 py-2 bg-error-foreground text-error rounded-lg cursor-pointer"
                        >
                          <DeleteIcon className="w-5 h-5" />
                          <span>Yoq qilish</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Desktop sidebar ── */}
              <div className="w-full lg:w-3/10 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hidden lg:flex flex-col gap-3">
                {/* Selected count */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Tanlangan mahsulotlar</span>
                  <span>{totalCount()} dona</span>
                </div>

                <div className="w-full h-px bg-gray-100" />

                {/* Address list */}
                <div className="flex flex-col gap-1">
                  {addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedAddressId === addr.id ? "bg-primary/5" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {addr.region}, {addr.district}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {addr.address}
                        </p>
                      </div>
                      {selectedAddressId === addr.id && (
                        <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-gray-100" />

                {/* ✅ Payment method selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-500">To'lov usuli</span>
                  <div className="flex gap-2">
                    {(["cash", "click"] as PaymentMethod[]).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                          paymentMethod === method
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-600 border-gray-200 hover:border-primary"
                        }`}
                      >
                        {method === "cash" ? "💵 Naqd" : "💳 Click"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-gray-100" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Jami summa</span>
                  <span className="text-lg font-bold text-gray-900">
                    {total().toLocaleString()} so'm
                  </span>
                </div>

                {/* ✅ Checkout button */}
                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout}
                  className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isPending
                    ? "Yuborilmoqda..."
                    : `Buyurtma berish (${selectedItems().length})`}
                </button>

                {!selectedAddressId && selectedItems().length > 0 && (
                  <p className="text-xs text-center text-red-400">
                    Buyurtma berish uchun manzil tanlang
                  </p>
                )}
              </div>

              {/* ── Mobile bottom bar ── */}
              <div className="fixed left-0 bottom-20 w-full bg-white rounded-t-xl shadow-md border-t border-accent p-4 flex flex-col gap-3 lg:hidden">
                {/* ✅ Payment method selector (mobile) */}
                <div className="flex gap-2">
                  {(["cash", "click"] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                        paymentMethod === method
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary"
                      }`}
                    >
                      {method === "cash" ? "💵 Naqd" : "💳 Click"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col text-sm shrink-0">
                    <p className="text-gray-500">
                      Mahsulotlar {totalCount()} dona
                    </p>
                    <p>Summa: {total().toLocaleString()} so'm</p>
                  </div>

                  {/* ✅ Checkout button (mobile) */}
                  <button
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                    className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-40 cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    {isPending
                      ? "Yuborilmoqda..."
                      : `Buyurtma berish (${selectedItems().length})`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;
