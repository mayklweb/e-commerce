type PaymentMethod = "cash" | "click";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  variant?: "desktop" | "mobile";
}

export function PaymentMethodSelector({
  selected,
  onChange,
  variant = "desktop",
}: PaymentMethodSelectorProps) {
  const methods: PaymentMethod[] = ["cash", "click"];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-500">To'lov usuli</span>
      <div className="flex gap-2">
        {methods.map((method) => (
          <button
            disabled={method === "click"}
            key={method}
            onClick={() => onChange(method)}
            className={`flex-1 ${variant === "mobile" ? "py-2.5" : "py-2"} rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
              selected === method
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary"
            }`}
          >
            {variant === "mobile"
              ? method === "cash"
                ? "💵 Naqd"
                : "💳 Click"
              : method === "cash"
                ? "Naqd"
                : "Click"}
          </button>
        ))}
      </div>
    </div>
  );
}