"use client";

import { useState } from "react";
import { DISTRICTS } from "@/app/profile/model/constants/constants";
import { EditIcon, LocationIcon, MarketIcon } from "@/app/shared/icons";
import {
  useCreateMarket,
  useDeleteMarket,
  useMarkets,
  useUpdateMarket,
} from "@/app/shared/lib/hooks/useMarket";
import { Market as MarketType } from "@/app/shared/lib/marketApi";

interface FormState {
  name: string;
  district: string;
  address: string;
}

const empty: FormState = { name: "", district: "", address: "" };

export function Market() {
  const { data: markets, isLoading } = useMarkets();
  const { mutate: createMarket, isPending: creating } = useCreateMarket();
  const { mutate: updateMarket, isPending: updating } = useUpdateMarket();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<FormState>(empty);

  const shop = markets?.[0]; // user has one market
  const isEmpty = !shop;

  const districtName =
  DISTRICTS.find((d) => String(d.district) === shop?.district) ?? shop?.district;

  const handleEdit = () => {
    setDraft({
      name: shop?.name ?? "",
      district: shop?.district ?? "",
      address: shop?.address ?? "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(empty);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDraft((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!draft.name || !draft.district || !draft.address) return;

    const payload = {
      name: draft.name,
      region: "Xorazm",
      district: draft.district,
      address: draft.address,
    };

    if (shop) {
      updateMarket({ id: shop.id, data: payload }, { onSuccess: handleCancel });
    } else {
      createMarket(payload, { onSuccess: handleCancel });
    }
  };

  if (isLoading) return <div className="text-sm text-gray-400">Yuklanmoqda...</div>;

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="hidden lg:block lg:mb-3">
        <h1 className="text-2xl font-semibold">Mening do'konim</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="bg-primary/5 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MarketIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Do'kon ma'lumotlari
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {shop?.name ?? (
                <span className="text-gray-400 font-normal">Nom kiritilmagan</span>
              )}
            </p>
          </div>

          {!isEmpty && !isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <EditIcon className="w-4 h-4" />
              Tahrirlash
            </button>
          )}
        </div>

        <div className="px-6 py-5">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              {/* Shop name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do'kon nomi
                </label>
                <input
                  type="text"
                  name="name"
                  value={draft.name}
                  onChange={handleChange}
                  placeholder="Masalan: Bahor savdo markazi"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tuman / Shahar
                </label>
                <select
                  name="district"
                  value={draft.district}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
                >
                  <option value="">Tumanni tanlang</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exact address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aniq manzil
                </label>
                <input
                  type="text"
                  name="address"
                  value={draft.address}
                  onChange={handleChange}
                  placeholder="Ko'cha, uy raqami..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSave}
                  disabled={creating || updating || !draft.name || !draft.district || !draft.address}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  {creating || updating ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                    <LocationIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Do'kon ma'lumotlari kiritilmagan
                  </p>
                  <button
                    onClick={handleEdit}
                    className="mt-3 px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Ma'lumot qo'shish
                  </button>
                </div>
              ) : (
                <>
                  <InfoRow
                    icon={<MarketIcon className="w-4 h-4" />}
                    label="Do'kon nomi"
                    value={shop.name}
                  />
                  <InfoRow
                    icon={<LocationIcon className="w-4 h-4" />}
                    label="Joylashuv"
                    value={[districtName, shop.address].filter(Boolean).join(", ")}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm text-gray-800 font-medium">
          {value || <span className="text-gray-400 font-normal">—</span>}
        </p>
      </div>
    </div>
  );
}