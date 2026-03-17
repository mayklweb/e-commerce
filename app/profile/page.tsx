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

import { useGetMe, useUser } from "../shared/lib/useAuth";

const SECTION_MAP: Record<NavKey, React.ReactNode> = {
  personal: <PersonalInfo />,
  shop: <Market />,
  orders: <Orders />,
  addresses: <Addresses />,
  favorites: <Favorites />,
};

function Account() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  const [activeNav, setActiveNav] = useState<NavKey>("personal");
  const [sheetNav, setSheetNav] = useState<NavKey | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { mutate: getMe } = useGetMe();

  useEffect(() => {
    getMe()
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Only redirect if no token AND no user
    if (!token && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNavClick = (key: NavKey): void => {
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
  };

  const sheetTitle = sheetNav
    ? (NAV_ITEMS.find((n) => n.key === sheetNav)?.label ?? "")
    : "";

  // Don't render anything until auth is resolved
  if (isLoading || !user) return null;

  return (
    <section>
      <div className="container">
        <div className="w-full flex gap-5 mt-24">
          <Sidebar activeNav={activeNav} onNavClick={handleNavClick} />
          {!isMobile && <div className="w-5/7">{SECTION_MAP[activeNav]}</div>}
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
