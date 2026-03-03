import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Delete02Icon,
  FilterHorizontalIcon,
  Home04Icon,
  MenuSquareIcon,
  Remove01Icon,
  Search01Icon,
  ShoppingBasket03Icon,
  User,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const UserIcon = ({ color = "#2e3192", size = 24 }) => {
  return (
    <HugeiconsIcon icon={User} size={size} color={color} strokeWidth={1.5} />
  );
};

export const CartIcon = ({ color = "#2e3192" }) => {
  return (
    <HugeiconsIcon
      icon={ShoppingBasket03Icon}
      size={24}
      color={color}
      strokeWidth={1.5}
    />
  );
};

export const SearchIcon = () => {
  return (
    <HugeiconsIcon
      icon={Search01Icon}
      size={24}
      color="#2e3192"
      strokeWidth={1.5}
    />
  );
};
export const HomeIcon = ({ color = "#2e3192" }) => {
  return (
    <HugeiconsIcon
      icon={Home04Icon}
      size={24}
      color={color}
      strokeWidth={1.5}
    />
  );
};

export const ProductsIcon = ({ color = "#2e3192" }) => {
  return (
    <HugeiconsIcon
      icon={MenuSquareIcon}
      size={24}
      color={color}
      strokeWidth={1.5}
    />
  );
};
export const PlusIcon = () => {
  return (
    <HugeiconsIcon
      icon={Add01Icon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />
  );
};
export const MinusIcon = () => {
  return (
    <HugeiconsIcon
      icon={Remove01Icon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />
  );
};
export const DeleteIcon = () => {
  return (
    <HugeiconsIcon
      icon={Delete02Icon}
      size={24}
      color="#e7000b"
      strokeWidth={1.5}
    />
  );
};

export const FilterIcon = () => {
  return (
    <HugeiconsIcon
      icon={FilterHorizontalIcon}
      size={24}
      color="#2e3192"
      strokeWidth={1.5}
    />
  );
};

export const CloseIcon = () => {
  return (
    <HugeiconsIcon
      icon={Cancel01Icon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />
  );
};

interface IconProps {
  className?: string;
}

export const DownIcon = ({ className }: IconProps) => {
  return (
    <HugeiconsIcon
      className={className}
      icon={ArrowDown01Icon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />
  );
};

export const RightIcon = ({ className }: IconProps) => {
  return (
    <HugeiconsIcon
      className={className}
      icon={ArrowRight01Icon}
      size={24}
      color="#2e3192"
      strokeWidth={1.5}
    />
  );
};
export const LeftIcon = ({ className }: IconProps) => {
  return (
    <HugeiconsIcon
      className={className}
      icon={ArrowLeft01Icon}
      size={24}
      color="#2e3192"
      strokeWidth={1.5}
    />
  );
};
export const LeftArrowIcon = ({ className }: IconProps) => {
  return (
    <HugeiconsIcon
      className={className}
      icon={ArrowLeft02Icon}
      size={28}
      color="#000000"
      strokeWidth={1.5}
    />
  );
};
