"use client";

import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "../store/CartStore";
import Link from "next/link";

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

          <div className="flex flex-col gap-5">
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
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
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-5">
              <div className="w-full lg:w-7/10 flex flex-col gap-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white border rounded-2xl p-4 flex gap-3 shadow-sm transition-colors ${
                      selectedIds.includes(item.id)
                        ? "border-primary/30"
                        : "border-gray-100"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className="mt-1 cursor-pointer shrink-0"
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

                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={
                          item?.images ? item?.images[0]?.url : "/product.jpg"
                        }
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
                        {item?.price?.toLocaleString()} so'm
                      </p>

                      {/* Qty + Remove */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-1 py-1">
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center">
                            {item.count}
                          </span>
                          <button
                            onClick={() => changeQty(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => remove(item.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Buyurtma berish ({selectedItems().length})
                </button>
              </div>
            </div>
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
                {" "}
                Xaridni boshlash
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              {/* Select all */}

              {/* Items */}

              {/* Summary + Checkout */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;
