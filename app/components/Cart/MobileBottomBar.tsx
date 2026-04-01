interface MobileBottomBarProps {
  totalCount: number;
  total: number;
  selectedCount: number;
  onCheckout: () => void;
}

export function MobileBottomBar({
  totalCount,
  total,
  selectedCount,
  onCheckout,
}: MobileBottomBarProps) {
  return (
    <div className="fixed left-0 bottom-20 w-full bg-white rounded-t-xl shadow-md border-t border-accent p-4 flex items-center justify-between gap-3 lg:hidden">
      <div className="flex flex-col text-sm shrink-0">
        <p className="text-gray-500">Mahsulotlar {totalCount} dona</p>
        <p className="font-semibold">{total.toLocaleString()} so'm</p>
      </div>

      <button
        disabled={!selectedCount}
        onClick={onCheckout}
        className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-40 cursor-pointer hover:opacity-90 transition-opacity"
      >
        Buyurtma berish ({selectedCount})
      </button>
    </div>
  );
}