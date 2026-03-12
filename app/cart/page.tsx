"use client";

import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "../store/CartStore";
import Link from "next/link";
import Image from "next/image";

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
                <ShoppingCart className="w-10 h-10 text-gray-400" />
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
            <div className="flex flex-col lg:flex-row gap-5">
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
                    {allSelected() && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Barchasini tanlash ({cart.length})
                  </span>
                  <span>Yetkazib berish vaqti 1 ish kuni</span>
                </div>
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white border rounded-xl p-2 flex gap-2 shadow-sm transition-all ${
                        selectedIds.includes(item.id)
                          ? "border-primary/30"
                          : "border-gray-100"
                      }`}
                    >
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
                        <p className="text-lg font-semibold text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {item?.price?.toLocaleString()} so'm
                        </p>
                        <p>Yetkazib berish vaqti: 1 ish kuni</p>

                        <div className="border border-solid border-accent mt-2"></div>

                        {/* Qty + Remove */}
                        <div className="flex gap-4 items-center justify-end mt-2">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-1 py-1">
                            <button
                              onClick={() => changeQty(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="text-sm font-semibold w-5 text-center">
                              {item.count}
                            </span>
                            <button
                              onClick={() => changeQty(item.id, 1)}
                              className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>

                          <button
                            onClick={() => remove(item.id)}
                            className="flex items-center font-medium gap-2 px-2 py-1.5 bg-error-foreground text-error rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span>Yoq qilish</span>
                          </button>
                        </div>
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
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-3/10 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Tanlangan mahsulotlar</span>
                  <span>{totalCount()} dona</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Jami summa</span>
                  <span className="text-lg font-bold text-gray-900">
                    {total().toLocaleString()} so'm
                  </span>
                </div>
                <button
                  disabled={selectedItems().length === 0}
                  className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Buyurtma berish ({selectedItems().length})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;
