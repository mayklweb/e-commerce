import { NAV_ITEMS } from "@/app/profile/model/constants/constants";
import { NavKey } from "@/app/profile/model/types/types";

interface SidebarProps {
  activeNav: NavKey;
  onNavClick: (key: NavKey) => void;
}

export function Sidebar({ activeNav, onNavClick }: SidebarProps) {
  return (
    <div className="w-full lg:w-2/7 flex flex-col gap-3 sticky top-24 self-start">
      {NAV_ITEMS.map(({ key, icon: Icon, label }) => {
        const isActive = activeNav === key;
        return (
          <button
            key={key}
            onClick={() => onNavClick(key)}
            className={[
              "w-full p-4 border rounded-xl flex items-center gap-2 transition-all",
              // mobile: never active
              "border-primary text-primary hover:bg-primary/10",
              // desktop: active overrides
              isActive
                ? "lg:bg-secondary lg:border-secondary"
                : "lg:border-primary lg:hover:bg-primary/10",
            ].join(" ")}
          >
            <Icon className="w-6 h-6 text-primary" />
            <span className="text-base font-semibold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
