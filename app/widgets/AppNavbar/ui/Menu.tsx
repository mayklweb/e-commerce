"use client"
import { CartIcon, HomeIcon, ProductsIcon, UserIcon } from "@/app/shared/icons";
import { useUser } from "@/app/shared/lib/useAuth";
import Link from "next/link";

function Menu() {

  const {data: user} = useUser()
  return (
    <div className="fixed z-2 bottom-0 left-0 w-full border-t-[0.5px] border-solid border-[#999] bg-[#FAFAFA] px-2">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link
            className="flex my-4 items-center justify-center flex-col gap-1 "
            href="/"
          >
            <span>
              <HomeIcon />
            </span>
            <span className="text-sm font-medium">Asosiy</span>
          </Link>
          <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href="/categories"
          >
            <span>
              <ProductsIcon />
            </span>
            <span className="text-sm font-medium">Katalog</span>
          </Link>
          <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href="/cart"
          >
            <span>
              <CartIcon />
            </span>
            <span className="text-sm font-medium">Savat</span>
          </Link>
          {/* <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href="/cart"
          >
            <span>
              <CartIcon />
            </span>
            <span className="text-sm font-medium">Savat</span>
          </Link> */}
          <Link
            className="my-4 flex items-center justify-center flex-col gap-1 "
            href={"/profile"}
          >
            <span>
              <UserIcon />
            </span>
            <span className="text-sm font-medium">
            {user?.name ? user.name : "Kirish" }
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
