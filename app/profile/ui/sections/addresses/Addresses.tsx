import { DISTRICTS } from "@/app/profile/model/constants/constants";
import { CloseIcon, DeleteIcon, EditIcon, PlusIcon } from "@/app/shared/icons";
import Image from "next/image";
import { useState } from "react";

interface Address {
  id: number;
  district_id: string;
  name: string;
  street: string;
  house: string;
  apartment: string;
  isDefault: boolean;
}

const districtName = (id: string) =>
  DISTRICTS.find((d) => d.id === Number(id))?.name_uz ?? "";

function AddressCard({
  address,
  onDelete,
  onSetDefault,
  onEdit,
}: {
  address: Address;
  onDelete: () => void;
  onSetDefault: () => void;
  onEdit: () => void;
}) {
  const fullAddress = [
    districtName(address.district_id),
    address.street,
    address.house ? `Uy ${address.house}` : "",
    address.apartment ? `Kv ${address.apartment}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
      <div>
        <p className="font-semibold text-gray-900">
          {districtName(address.district_id)}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Manzil</p>
        <p className="text-sm font-semibold text-gray-800 mt-1 leading-snug">
          {fullAddress}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={onSetDefault}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            address.isDefault
              ? "bg-primary text-white cursor-default"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
          disabled={address.isDefault}
        >
          {address.isDefault ? "Standart" : "Standart qilish"}
        </button>

        {/* Edit button */}
        <button
          onClick={onEdit}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-colors"
        >
          <EditIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onDelete}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    district_id: "",
    name: "",
    street: "",
    house: "",
    apartment: "",
  });

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now(),
      ...form,
      isDefault: addresses.length === 0, // first address is default
    };
    setAddresses((prev) => [...prev, newAddress]);
    setForm({
      district_id: "",
      name: "",
      street: "",
      house: "",
      apartment: "",
    });
    closeModal();
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      // if deleted was default, make first one default
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const handleSetDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [editForm, setEditForm] = useState<typeof form | null>(null);

  const handleEditOpen = (addr: Address) => {
    setEditingAddress(addr);
    setEditForm({
      district_id: addr.district_id,
      name: addr.name,
      street: addr.street,
      house: addr.house,
      apartment: addr.apartment,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddress || !editForm) return;
    setAddresses((prev) =>
      prev.map((a) => (a.id === editingAddress.id ? { ...a, ...editForm } : a)),
    );
    setEditingAddress(null);
    setEditForm(null);
  };

  return (
    <div className="w-full h-full">
      {/* Page header */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-5">
        <h1 className="text-2xl font-semibold">Manzillar</h1>
        {addresses.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <PlusIcon className="w-4 h-4" />
            Manzil qo'shish
          </button>
        )}
      </div>

      {addresses.length === 0 ? (
        /* Empty state */
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-center max-w-xs">
            <Image width={200} height={200} src="/location.svg" alt="" />
            <h3 className="text-2xl font-semibold mt-5">Manzil mavjud emas</h3>
            <p className="text-gray-500">
              Hozircha sizda manzil mavjud emas manzil qo'shish uchun "Manzil
              qo'shish"ni bosing
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2.5 px-6 py-3 text-white font-normal flex gap-3 items-center bg-primary rounded-xl cursor-pointer"
            >
              <PlusIcon className="text-white w-5 h-5" />
              Manzil qo'shish
            </button>
          </div>
        </div>
      ) : (
        /* Address cards grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onDelete={() => handleDelete(addr.id)}
              onSetDefault={() => handleSetDefault(addr.id)}
              onEdit={() => handleEditOpen(addr)} // ← add this
            />
          ))}
        </div>
      )}

      {/* Mobile add button */}
      {addresses.length > 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity z-40"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      )}

      {/* Modal */}
      {/* Add Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Manzil qo'shish</h2>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tuman / Shahar
                </label>
                <select
                  name="district_id"
                  value={form.district_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
                >
                  <option value="">Tumanni tanlang</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name_uz}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manzil nomi
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Uy, Ish..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ko'cha
                </label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="Ko'cha nomi"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary "
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Uy raqami
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={form.house}
                    onChange={handleChange}
                    placeholder="12"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Xonadon
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={form.apartment}
                    onChange={handleChange}
                    placeholder="5"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary "
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingAddress && editForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setEditingAddress(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Manzilni tahrirlash</h2>
              <button
                onClick={() => setEditingAddress(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Tuman / Shahar
                </label>
                <select
                  name="district_id"
                  value={editForm.district_id}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                >
                  <option value="">Tumanni tanlang</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name_uz}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Manzil nomi
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Uy, Ish..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary "
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Ko'cha
                </label>
                <input
                  type="text"
                  name="street"
                  value={editForm.street}
                  onChange={handleEditChange}
                  placeholder="Ko'cha nomi"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary "
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Uy raqami
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={editForm.house}
                    onChange={handleEditChange}
                    placeholder="12"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Xonadon
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={editForm.apartment}
                    onChange={handleEditChange}
                    placeholder="5"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingAddress(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
