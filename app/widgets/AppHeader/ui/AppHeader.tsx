"use client";
import Link from "next/link.js";
import { SearchIcon, UserIcon, CartIcon, KatalogIcon } from "@/app/shared/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/app/store/CartStore";
import { useGetMe, useUser } from "@/app/shared/lib/useAuth";
import { useCategories } from "@/app/shared/lib/hooks/useCategories";
import { CategoriesType } from "@/app/types";
import { GridIcon } from "lucide-react";

// --- Katalog Dropdown ---


function KatalogDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: categories, isLoading, isError } = useCategories();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div ref={containerRef} className="relative">
      {/* ✅ Main Button - Icon can be changed here */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`text-[16px] text-white font-medium capitalize lg:flex items-center gap-2 px-5 py-2 rounded-lg hidden transition-all duration-300 border ${
          open
            ? "bg-secondary border-secondary/20"
            : "bg-primary hover:bg-secondary border-primary/10"
        }`}
      >
        {/* 🎨 Change icon here - Options:
            <KatalogIcon className="text-white w-5 h-5" />
            <MenuIcon className="text-white w-5 h-5" />
            <GridIcon className="text-white w-5 h-5" />
        */}
        <GridIcon className="text-white w-5 h-5" />
        Katalog
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ✅ Dropdown Menu */}
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] w-70 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          style={{ animation: "katalogDrop 0.2s cubic-bezier(.16,1,.3,1)" }}
        >
          <div
            className="max-h-80 overflow-y-auto py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat: CategoriesType) => (
              <Link
                key={cat.id || cat.name}
                href={`/categories/${cat.id || cat.name || cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setOpen(false)} // Close dropdown on click
              >
                <button className="group w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                  {/* ✅ Category Icon */}
                  <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center text-base shrink-0 transition-colors">
                    {cat.icon}
                  </span>

                  {/* ✅ Category Name */}
                  <span className="flex-1 text-left">
                    <span className="block text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                  </span>

                  {/* ✅ Arrow Icon */}
                  <svg
                    className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes katalogDrop {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// --- AppHeader ---
function AppHeader() {
  const path = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const { data: user } = useUser();
  const { mutate: getMe } = useGetMe();

  useEffect(() => {
    getMe();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const hideHeader = ["signup", "login", "checkout"].includes(
    path.split("/")[1],
  );

  const { cart } = useCartStore();

  return (
    <header>
      {!hideHeader && (
        <div className="w-full bg-white shadow-sm fixed z-10">
          <div className="container">
            <div className="relative">
              <div className="w-full flex gap-4 items-center justify-between py-4">
                {/* Logo */}
                <div>
                  <Link href={"/"} className="w-40 h-12 hidden lg:block">
                    <Image
                      src="/logo.png"
                      width={200}
                      height={50}
                      alt="Logo"
                      className="w-44 h-10 object-cover"
                    />
                  </Link>
                  <Link href={"/"} className="w-10 h-10 block lg:hidden">
                    <Image
                      src="/logo1.svg"
                      width={40}
                      height={40}
                      alt="Logo"
                      className="w-10 h-10 object-cover lg:hidden"
                    />
                  </Link>
                </div>

                {/* Katalog + Search */}
                <div className="w-full flex flex-auto lg:flex-0 gap-3">
                  <KatalogDropdown />
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="lg:w-100 flex flex-auto border border-primary/10 rounded-lg overflow-hidden focus-within:border-secondary transition-all ease-in-out duration-300">
                      <div className="flex flex-auto px-3 py-2">
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Shirinlik..."
                          className="outline-none w-full"
                          type="text"
                        />
                      </div>
                      <button
                        className="text-sm text-primary font-semibold px-2.5 bg-primary/10 rounded-md hover:bg-secondary transition-all ease-in-out duration-300"
                        type="submit"
                      >
                        <SearchIcon />
                      </button>
                    </div>
                  </form>
                </div>

                {/* User + Cart */}
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    href={"/profile"}
                    className="text-xs flex flex-row items-center gap-1 bg-primary/10 px-5 py-2.5 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
                  >
                    <UserIcon className="text-primary w-6 h-6" />
                    <span className="text-[16px] text-primary font-semibold capitalize">
                      {user?.name ? user.name : "Kirish"}
                    </span>
                  </Link>
                  <div className="relative">
                    <Link
                      href={"/cart"}
                      className="text-xs flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-lg hover:bg-secondary transition-all duration-300"
                    >
                      <CartIcon className="text-primary w-6 h-6" />
                      <span className="text-[16px] text-primary font-semibold capitalize">
                        Savat
                      </span>
                    </Link>
                    {cart.length > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 bg-primary text-white text-sm px-2 py-0.5 leading-[120%] rounded-full z-10">
                        {cart.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default AppHeader;
