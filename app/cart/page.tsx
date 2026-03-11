"use client";

import { Check, ChevronDown, MapPinPen, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { DeleteIcon, MinusIcon, PlusIcon } from "../shared/icons";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selected: boolean;
}

const FAKE_CART: CartItem[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    price: 320000,
    quantity: 1,
    selected: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy Buds2",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200",
    price: 210000,
    quantity: 2,
    selected: true,
  },
  {
    id: 3,
    name: "Xiaomi Smart Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
    price: 450000,
    quantity: 1,
    selected: false,
  },
];

function Cart() {
  const [items, setItems] = useState<CartItem[]>(FAKE_CART);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  // Replace with your real saved addresses
  const savedAddresses = [
    { id: "1", name: "Uy", full: "Xonqa tumani, Bog'cha ko'cha 12-uy" },
    {
      id: "2",
      name: "Ish",
      full: "Urganch, Al-Xorazmiy ko'cha 5-uy, 3-xonadon",
    },
  ];

  const selectedAddress = savedAddresses.find(
    (a) => a.id === selectedAddressId,
  );

  const allSelected = items.length > 0 && items.every((i) => i.selected);

  const toggleAll = () => {
    setItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)),
    );
  };

  const changeQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const selectedItems = items.filter((i) => i.selected);
  const total = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = selectedItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    // <section className="">
    //   <div className="w-full py-2 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
    //     <h1 className="text-xl font-medium text-center ">
    //       Tovarlar tanlanmagan
    //     </h1>
    //   </div>
    //   <div className="container">
    //     <div className="">
    //       <div>
    //         <button></button>
    //         <button>Hammasini tanlash</button>
    //       </div>

    //       <div>
    //         <div className="cart-item-delivery-info">
    //           <div className="cart-item-delivery-info-head">
    //             <span className="cart-item-delivery-info-stock-type">
    //               Bunyod Optom yetkazib berishi 1-2 ish kun ichida
    //             </span>
    //           </div>
    //           <span className="cart-item-delivery-info-date"></span>
    //         </div>

    //         <div className="flex gap-3 border-t border-[#E0E0E0] border-solid py-3">
    //           <div className="rounded-2xl overflow-hidden w-[180px] h-[120px]">
    //             <Image
    //               src="/cookie.webp"
    //               alt="product"
    //               width={180}
    //               height={120}
    //               priority
    //             />
    //           </div>
    //           <div className="flex flex-col flex-auto justify-between">
    //             <div>
    //               <h3 className="text-xl font-medium">SNIKERS</h3>
    //               <p className="text-lg">33 000 USZ</p>
    //             </div>
    //             <div className="flex items-center justify-between mt-2">
    //               <div className="flex items-center gap-3 border border-[#cccccc] border-solid rounded-xl ">
    //                 <button className="p-1.5">
    //                   <Minus />
    //                 </button>
    //                 <p>1</p>
    //                 <button className="p-1.5">
    //                   <Plus />
    //                 </button>
    //               </div>
    //               <div>
    //                 <button className="p-1.5">
    //                   <Trash2 />
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="p-2 flex gap-2 flex-col rounded-xl bg-accent">
    //           <div className="flex gap-2 items-start">
    //             <div className="ronuded-xl flex shrink-0">
    //               <Image
    //                 className="rounded-xl"
    //                 width={160}
    //                 height={120}
    //                 src={"/candy.webp"}
    //                 alt="product"
    //               />
    //             </div>
    //             <div className="w-full flex flex-col justify-between truncate">
    //               <div>
    //                 <p className="w-full truncate text-base font-medium">
    //                   ВЕЧЕРНИ ОГНИ МОЛОЧНИ 3 КГ
    //                 </p>
    //               </div>
    //               <div>
    //                 <div className="flex items-center justify-between text-sm">
    //                   <p>Kategory:</p>
    //                   <span></span>
    //                   <p>Pecheniyalar</p>
    //                 </div>
    //                 <div className="flex items-center justify-between text-sm">
    //                   <p>Brend:</p>
    //                   <span></span>
    //                   <p>N'medov</p>
    //                 </div>
    //               </div>
    //               <div className="w-full flex justify-end">
    //                 <p className="font-medium w-auto">30700.00 so’m</p>
    //               </div>
    //             </div>
    //             <input
    //               className="flex shrink-0 w-5 h-5"
    //               type="checkbox"
    //               name=""
    //               id=""
    //             />
    //           </div>
    //           <div className="w-full h-0.5 bg-gray"></div>
    //           <div className="flex justify-end gap-4">
    //             <div className="flex gap-2 items-center border rounded-xl">
    //               <button className="p-2">
    //                 <MinusIcon />
    //               </button>
    //               <span>1</span>
    //               <button className="p-2">
    //                 <PlusIcon />
    //               </button>
    //             </div>
    //             <button className="text-error font-medium px-4 py-2 flex gap-2 items-center bg-error-foreground rounded-xl">
    //               <span>
    //                 <DeleteIcon />
    //               </span>
    //               <span>Yo'q qilish</span>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="w-full h-full flex flex-col">
      {/* Page header */}
      <div className="hidden lg:block mb-5">
        <h1 className="text-2xl font-semibold">Savat</h1>
      </div>

      {items.length === 0 ? (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold">Savat bo'sh</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            Hozircha savatda mahsulot yo'q. Xarid qilishni boshlang!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Select all */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={toggleAll}
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                allSelected
                  ? "bg-primary border-primary"
                  : "border-gray-300 bg-white"
              }`}
            >
              {allSelected && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm font-medium text-gray-700">
              Barchasini tanlash ({items.length})
            </span>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-4 flex gap-3 shadow-sm transition-colors ${
                  item.selected ? "border-primary/30" : "border-gray-100"
                }`}
              >
                {/* Checkbox */}
                <div
                  className="mt-1 cursor-pointer shrink-0"
                  onClick={() => toggleItem(item.id)}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      item.selected
                        ? "bg-primary border-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {item.selected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>

                {/* Image */}
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString()} so'm
                  </p>

                  {/* Qty + Remove */}
                  <div className="flex items-center justify-between mt-1">
                    {/* Quantity control */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-1 py-1">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery address selector */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
              onClick={() => setIsAddressOpen((p) => !p)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPinPen className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Yetkazish manzili</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedAddress ? selectedAddress.name : "Manzil tanlang"}
                  </p>
                  {selectedAddress && (
                    <p className="text-xs text-gray-400 mt-0.5 max-w-56 truncate">
                      {selectedAddress.full}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isAddressOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isAddressOpen && (
              <div className="border-t border-gray-100">
                {savedAddresses.map((addr) => (
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
                      <p className="text-sm font-medium text-gray-800">
                        {addr.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {addr.full}
                      </p>
                    </div>
                    {selectedAddressId === addr.id && (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary + Checkout */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Tanlangan mahsulotlar</span>
              <span>{totalCount} dona</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Jami summa</span>
              <span className="text-lg font-bold text-gray-900">
                {total.toLocaleString()} so'm
              </span>
            </div>
            <button
              disabled={selectedItems.length === 0 || !selectedAddressId}
              className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buyurtma berish ({selectedItems.length})
            </button>
            {!selectedAddressId && selectedItems.length > 0 && (
              <p className="text-xs text-center text-red-400">
                Buyurtma berish uchun manzil tanlang
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
