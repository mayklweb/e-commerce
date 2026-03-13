import { Order, STATUS_CONFIG, orders } from "@/app/profile/model/constants/constants";
import { CartIcon, ClockIcon, CloseIcon, EyeIcon, LocationIcon } from "@/app/shared/icons";
import { useState } from "react";

export function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="w-full h-full">
      <div className="hidden lg:block lg:mb-5">
        <h1 className="text-2xl font-semibold">Buyurtmalar</h1>
      </div>

      {orders.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
              <CartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold">Buyurtma mavjud emas</h3>
            <p className="text-gray-500 text-sm">
              Hozircha sizda hech qanday buyurtma mavjud emas
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => setSelectedOrder(order)}
            />
          ))}
        </div>
      )}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Buyurtma raqami</p>
                <p className="text-base font-bold text-gray-900">
                  #{selectedOrder.id}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${STATUS_CONFIG[selectedOrder.status].className}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[selectedOrder.status].dot}`}
                  />
                  {STATUS_CONFIG[selectedOrder.status].label}
                </span>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Date */}
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {selectedOrder.createdAt}
              </span>
            </div>

            {/* All items */}
            <div className="px-5 py-4 flex flex-col gap-4 max-h-72 overflow-y-auto">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.quantity} dona × {item.price.toLocaleString()} so'm
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    {(item.price * item.quantity).toLocaleString()} so'm
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Jami summa</p>
              <p className="text-lg font-bold text-gray-900">
                {selectedOrder.total.toLocaleString()} so'm
              </p>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-2">
              {(selectedOrder.status === "pending" ||
                selectedOrder.status === "processing") && (
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                  <LocationIcon className="w-4 h-4" />
                  Kuzatish
                </button>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  onViewDetails,
}: {
  order: Order;
  onViewDetails: () => void;
}) {
  const status = STATUS_CONFIG[order.status];
  const previewItems = order.items.slice(0, 3);
  const remaining = order.items.length - 3;

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            #{order.id}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-400">{order.createdAt}</span>
        </div>
        {/* Status badge */}
        <span
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-xl ${status.className}`}
        >
          <span className={`w-1.5 h-1.5 rounded-xl ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Items */}
      <div className="px-4 py-3 flex flex-col gap-3">
        {previewItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Image */}
            {/* <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div> */}
            {/* Name & qty */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.quantity} dona
              </p>
            </div>
            {/* Price */}
            <p className="text-sm font-semibold text-gray-800 shrink-0">
              {(item.price * item.quantity).toLocaleString()} so'm
            </p>
          </div>
        ))}

        {remaining > 0 && (
          <p className="text-xs text-gray-400 pl-0.5">
            +{remaining} ta mahsulot yana
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">Jami</p>
          <p className="text-base font-bold text-gray-900">
            {order.total.toLocaleString()} so'm
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Track order — only for active orders */}
          {(order.status === "pending" || order.status === "processing") && (
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors">
              <LocationIcon className="w-3.5 h-3.5" />
              Kuzatish
            </button>
          )}
          {/* View details — always shown */}
          <button
            onClick={onViewDetails} // ← add this
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <EyeIcon className="w-3.5 h-3.5" />
            Batafsil
          </button>
        </div>
      </div>
    </div>
  );
}