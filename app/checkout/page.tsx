"use client";

import { useState } from "react";
// import { Check, ChevronDown, MapPin, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/CartStore";
import { useAddresses } from "../shared/lib/hooks/useAddresses";
import { useCheckout } from "../shared/lib/hooks/useCheckout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartIcon, CheckIcon, DownIcon, LocationIcon } from "../shared/icons";

function Checkout() {
  const router = useRouter();
  const { selectedItems, total, totalCount } = useCartStore();
  const { data: addresses } = useAddresses();
  const { mutate: checkout, isPending } = useCheckout();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "click">("cash");
  const [notes, setNotes] = useState("");

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);
  const items = selectedItems();

  const handleCheckout = () => {
    checkout(
      {
        address_id: selectedAddressId,
        payment_method: paymentMethod,
        notes,
        items: items.map((i) => ({ product_id: i.id, qty: i.count })),
      },
      {
        onSuccess: () => router.push("/orders"),
      },
    );
  };

  if (items.length === 0) {
    return (
      <div className="container mt-10 text-center text-gray-400 text-xl">
        Tanlangan mahsulot yo'q
      </div>
    );
  }

  return (
    <div className="container mt-5 max-w-lg mx-auto pb-10">
      <h1 className="text-2xl font-semibold mb-6">Buyurtma berish</h1>

      <div className="flex flex-col gap-4">
        {/* Product list summary */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            Mahsulotlar ({totalCount()} dona)
          </h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
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
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.count} dona</p>
                </div>
                <p className="text-sm font-bold shrink-0">
                  {(Number(item.price) * item.count).toLocaleString()} so'm
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Address selector */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
            onClick={() => setIsAddressOpen((p) => !p)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <LocationIcon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Yetkazish manzili</p>
                <p className="text-sm font-medium">
                  {selectedAddress
                    ? `${selectedAddress.region}, ${selectedAddress.district}`
                    : "Manzil tanlang"}
                </p>
                {selectedAddress && (
                  <p className="text-xs text-gray-400 truncate max-w-56">
                    {selectedAddress.address}
                  </p>
                )}
              </div>
            </div>
            <DownIcon
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isAddressOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isAddressOpen && (
            <div className="border-t border-gray-100">
              {addresses?.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    setIsAddressOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedAddressId === addr.id ? "bg-primary/5" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">
                      {addr.region}, {addr.district}
                    </p>
                    <p className="text-xs text-gray-400">{addr.address}</p>
                  </div>
                  {selectedAddressId === addr.id && (
                    <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment method */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            To'lov usuli
          </h2>
          <div className="flex gap-3">
            {(["cash", "click"] as const).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-colors ${
                  paymentMethod === method
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {method === "cash" ? "💵 Naqd" : "📱 Click"}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">
            Izoh (ixtiyoriy)
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Kuryer uchun izoh..."
            rows={3}
            className="w-full text-sm border border-gray-200 rounded-xl p-3 resize-none outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Total + Submit */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Jami summa</span>
            <span className="text-xl font-bold text-gray-900">
              {total().toLocaleString()} so'm
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isPending || !selectedAddressId}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CartIcon className="w-5 h-5" />
            {isPending ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
          </button>
          {!selectedAddressId && (
            <p className="text-xs text-center text-red-400">
              Buyurtma berish uchun manzil tanlang
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
