import { ChangeEvent } from "react";

export type FieldKey = "id" | "name" | "phone" | "birthdate" | "gender" | "email";
export type NavKey = "personal" | "shop" | "orders" | "addresses" | "favorites" ;

export interface NavItem {
  key: NavKey;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export interface FieldConfig {
  key: FieldKey;
  label: string;
  disabled?: boolean;
}

export type ProfileFields = Record<FieldKey, string>;

export interface ProfileFieldProps {
  label: string;
  value: string;
  editing: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
}