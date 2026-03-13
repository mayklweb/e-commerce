"use client";

import { useEffect, useState } from "react";
import {
  useAddAddress,
  useAddresses,
  useDeleteAddress,
  useEditAddress,
  useSetDefaultAddress,
} from "@/app/shared/lib/hooks/useAddresses";
import { Address } from "@/app/shared/lib/addressesApi";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
} from "@/app/shared/icons";

const DISTRICTS = [
  "Urganch tumani",
  "Xonqa tumani",
  "Bog'ot tumani",
  "Gurlan tumani",
  "Qo'shko'pir tumani",
  "Shovot tumani",
  "Yangiariq tumani",
  "Yangibozor tumani",
  "Xazorasp tumani",
  "Pitnak tumani",
];

interface FormState {
  region: string;
  district: string;
  address: string;
  is_default?: number;
}

const empty: FormState = {
  region: "Xorazm",
  district: "",
  address: "",
  is_default: 0,
};

export function Addresses() {
  const { data: addresses, isLoading } = useAddresses();
  const { mutate: addAddress, isPending: adding } = useAddAddress();
  const { mutate: editAddress, isPending: editing } = useEditAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefault } = useSetDefaultAddress();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // useEffect(() => {
  //   if (addresses && !selectedId) {
  //     const def = addresses.find((a) => a.is_default == 1);
  //     if (def) setSelectedId(def.id);
  //   }
  // }, [addresses]);

  const openAdd = () => {
    setEditingId(null);
    setForm(empty);
    setIsFormOpen(true);
  };

  const openEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm({
      region: addr.region,
      district: addr.district,
      address: addr.address,
      // is_default: addr.is_default,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(empty);
  };

  const handleSubmit = () => {
    if (!form.district || !form.address) return;

    const payload: Partial<Address> = {
      region: "Xorazm",
      district: form.district,
      address: form.address,
      // is_default: form.is_default,
    };

    if (editingId) {
      editAddress({ id: editingId, data: payload }, { onSuccess: closeForm });
    } else {
      addAddress(payload as Omit<Address, "id">, { onSuccess: closeForm });
    }
  };

  if (isLoading)
    return <div className="text-sm text-gray-400">Yuklanmoqda...</div>;

  return (
    <div className="flex flex-col gap-3">
      {/* Address list */}
      {addresses?.map((address: Address) => (
        <div
          key={address.id}
          onClick={() => setSelectedId(address.id)}
          className={`border rounded-xl p-4 flex flex-col items-start justify-between gap-3 transition-colors cursor-pointer ${
            selectedId === address.id
              ? "border-accent bg-[#e5e6ff]"
              : "bg-primary/10 border-gray-100"
          }`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                {address.region}, {address.district}
              </p>
              {/* {address.is_default == 1 && (
                <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-medium">
                  Asosiy
                </span>
              )} */}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {address.address}
            </p>
          </div>

          <div className="w-full h-0.25 bg-" />

          <div>
            <button>Standard qilish</button>
            <button className="border-accent border rounded-xl text-gray">
              <EditIcon />
            </button>
            <button>
              <DeleteIcon />
              {/* <DelateIcon */}
            </button>
          </div>

          {/* Radio indicator */}
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              selectedId === address.id ? "border-primary" : "border-gray-300"
            }`}
          >
            {selectedId === address.id && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </div>
        </div>
      ))}
      {/* Empty state */}
      {addresses?.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-6">
          Manzil yo'q. Yangi manzil qo'shing.
        </div>
      )}

      {/* Add button */}
      {!isFormOpen && (
        <button
          onClick={openAdd}
          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Yangi manzil qo'shish
        </button>
      )}

      {/* Form */}
      {isFormOpen && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">
              {editingId ? "Manzilni tahrirlash" : "Yangi manzil"}
            </h3>
            <button
              onClick={closeForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Region - disabled */}
          <input
            value="Xorazm"
            disabled
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
          />

          {/* District - select */}
          <select
            value={form.district}
            onChange={(e) =>
              setForm((p) => ({ ...p, district: e.target.value }))
            }
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary transition-colors bg-white"
          >
            <option value="">Tuman tanlang</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Address */}
          <input
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            placeholder="Ko'cha, uy raqami"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
          />

          {/* is_default checkbox */}
          <label
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() =>
              setForm((p) => ({ ...p, is_default: p.is_default == 1 ? 0 : 1 }))
            }
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                form.is_default == 1
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {form.is_default == 1 && (
                <CheckIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-600">
              Asosiy manzil sifatida saqlash
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={closeForm}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleSubmit}
              disabled={adding || editing || !form.district || !form.address}
              className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {adding || editing
                ? "Saqlanmoqda..."
                : editingId
                  ? "Saqlash"
                  : "Qo'shish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
