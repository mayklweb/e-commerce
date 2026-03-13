"use client";
import {
  FIELD_CONFIG,
  INITIAL_FIELDS,
} from "@/app/profile/model/constants/constants";
import { FieldKey, ProfileFields } from "@/app/profile/model/types/types";
import { useState, useRef, useEffect } from "react";
import { ProfileField } from "../profileField/ProfileField";
import { useGetMe, useUser } from "@/app/shared/lib/useAuth";

export function PersonalInfo() {
  const { mutate: getMe } = useGetMe(); // 👈 data comes from mutation itself
  const { data: user } = useUser(); // 👈 data comes from mutation itself
  const [fields, setFields] = useState<ProfileFields>(INITIAL_FIELDS); // 👈 always initialized
  const [editingField, setEditingField] = useState<FieldKey | null>(null);
  const inputRefs = useRef<Partial<Record<FieldKey, HTMLInputElement | null>>>(
    {},
  );

  useEffect(() => {
    getMe();
  }, []);

  console.log(user);

  useEffect(() => {
    if (user) {
      setFields((prev) => ({
        ...prev,
        name: user.name ?? "",
        phone: user.phone ?? "",
        id: String(user.id), // 👈 convert number to string
      }));
    }
  }, [user]);

  useEffect(() => {
    if (editingField) inputRefs.current[editingField]?.focus();
  }, [editingField]);

  const handleToggle = (key: FieldKey): void =>
    setEditingField((prev) => (prev === key ? null : key));

  const handleChange = (key: FieldKey, value: string): void =>
    setFields((prev) => ({ ...prev!, [key]: value })); // 👈 add ! to handle undefined

  return (
    <div className="w-full h-full">
      <div className="hidden lg:block lg:mb-3">
        <h1 className="text-2xl font-semibold">Shaxsiy ma'lumotlar</h1>
      </div>
      <div className="flex flex-col gap-2.5">
        {FIELD_CONFIG.map(({ key, label, disabled }) => (
          <ProfileField
            key={key}
            label={label}
            value={fields?.[key] ?? ""} // 👈 fix
            editing={editingField === key}
            disabled={disabled}
            onChange={(e) => handleChange(key, e.target.value)}
            onToggle={() => handleToggle(key)}
            inputRef={(el) => {
              inputRefs.current[key] = el;
            }}
          />
        ))}
      </div>
      {String(JSON.stringify(user))}
    </div>
  );
}
