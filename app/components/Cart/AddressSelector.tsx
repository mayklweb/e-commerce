import { CheckIcon } from "../../shared/icons";

interface Address {
  id: number;
  region: string;
  district: string;
  address: string;
  is_default?: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  variant?: "desktop" | "mobile";
}

export function AddressSelector({
  addresses,
  selectedId,
  onSelect,
  variant = "desktop",
}: AddressSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      {variant === "mobile" && (
        <span className="text-sm text-gray-500">Manzil</span>
      )}
      <div className="flex flex-col gap-1">
        {addresses?.map((addr) => (
          <div
            key={addr.id}
            onClick={() => onSelect(addr.id)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
              variant === "desktop"
                ? `hover:bg-gray-50 ${selectedId === addr.id ? "bg-primary/5" : ""}`
                : `border ${
                    selectedId === addr.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-100 bg-gray-50"
                  }`
            }`}
          >
            <div>
              <p className="text-sm font-medium">
                {addr.region}, {addr.district}
              </p>
              <p className="text-xs text-gray-400 truncate">{addr.address}</p>
            </div>
            {selectedId === addr.id && (
              <CheckIcon className="w-4 h-4 text-primary shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}