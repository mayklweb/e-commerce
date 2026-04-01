"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Addresses,
  Favorites,
  Market,
  Orders,
  PersonalInfo,
} from "./ui/sections";
import { NavKey } from "./model/types/types";
import { NAV_ITEMS } from "./model/constants/constants";
import { Sidebar } from "./ui/components/Sidebar/Sidebar";
import { BottomSheet } from "./ui/components/bottomsheet";

import { useRequireAuth } from "../shared/lib/hooks/useRequireAuth";

import { useLogout } from "../shared/lib/useAuth";

import { useUIStore } from "../store/useUIStore";

const SECTION_MAP: Record<NavKey, React.ReactNode> = {
  personal: <PersonalInfo />,
  shop: <Market />,
  orders: <Orders />,
  addresses: <Addresses />,
  favorites: <Favorites />,
};

function Account() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState<NavKey>("personal");
  const [sheetNav, setSheetNav] = useState<NavKey | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Get active section from store
  const { activeSection, setActiveSection } = useUIStore();

  const { mutate: logout, isPending: loggingOut } = useLogout();
  const { isLoading } = useRequireAuth(); // ✅ This handles redirect now

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ Handle mobile sheet when activeSection changes
  useEffect(() => {
    if (isMobile && activeSection !== "personal") {
      setSheetNav(activeSection);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setSheetOpen(true)),
      );
    }
  }, [activeSection, isMobile]);

  const handleNavClick = (key: NavKey): void => {
    setActiveSection(key); // ✅ Update store instead of local state
    if (isMobile) {
      setSheetNav(key);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setSheetOpen(true)),
      );
    } else {
      setActiveNav(key);
    }
  };

  const handleClose = (): void => {
    setSheetOpen(false);
    setTimeout(() => setSheetNav(null), 400);
    setActiveSection("personal"); // ✅ Reset to default on close
  };

  const handleLogout = () => logout();

  const sheetTitle = sheetNav
    ? (NAV_ITEMS.find((n) => n.key === sheetNav)?.label ?? "")
    : "";

  // ✅ Show loading state
  if (isLoading) {
    return (
      <div className="container mt-24 flex justify-center">
        <div className="animate-pulse text-lg">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="w-full h-full flex flex-col gap-5 mt-24">
          <div className="w-full flex gap-5">
            <Sidebar
              activeNav={activeSection} // ✅ Use store value
              onNavClick={handleNavClick}
            />

            {!isMobile && <div className="w-5/7">{SECTION_MAP[activeSection]}</div>}
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className=" lg:hidden mt-2 w-full py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium
            hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loggingOut ? "Chiqilmoqda..." : "Hisobdan chiqish"}
          </button>
        </div>
      </div>

      {isMobile && (
        <BottomSheet title={sheetTitle} open={sheetOpen} onClose={handleClose}>
          {sheetNav && SECTION_MAP[sheetNav]}
        </BottomSheet>
      )}
    </section>
  );
}

export default Account;
