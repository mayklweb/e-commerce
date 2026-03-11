import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { authStore } from "@/app/store/AuthStore";

function Menu() {
  return (
    <div className="fixed bottom-0 left-0 w-full border-t-[0.5px] border-solid border-[#999] bg-[#FAFAFA] px-2">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link
            className="flex my-4 items-center justify-center flex-col gap-1 "
            href="/"
          >
            <span>
              <Home />
            </span>
            <span className="text-sm font-medium">Asosiy</span>
          </Link>
          <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href="/categories"
          >
            <span>
              <LayoutGrid />
            </span>
            <span className="text-sm font-medium">Mahsulotlar</span>
          </Link>
          <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href="/cart"
          >
            <span>
              <ShoppingBag />
            </span>
            <span className="text-sm font-medium">Savat</span>
          </Link>
          <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href={"/profile"}
          >
            <span>
              <User />
            </span>
            <span className="text-sm font-medium">
              {/* Telegram firstname */}
              Muhammad
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
