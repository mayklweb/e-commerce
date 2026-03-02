"use client";

import Link from "next/link";
import { CartIcon, HomeIcon, ProductsIcon, UserIcon } from "@/app/shared/icons";
// import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { usePathname } from "next/navigation";

export const AppFooter = () => {
  const pathname = usePathname();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);

  const cartEmpty = cart.length === 0;

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0,
  );

  return (
    <footer>
      <div
        className={`w-full bg-[#ffffff] shadow-[0px_-1px_6px_0px_rgba(0,0,0,0.1)] rounded-2xl fixed bottom-0 lg:hidden ${pathname === "/checkout" && "shadow-none rounded-none"}`}
      >
        <div
          className={`w-full bg-white rounded-t-2xl py-3 border-b ${
            pathname === "/cart" && !cartEmpty ? "block" : "hidden"
          }`}
        >
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="">
                <p className="text-xs">Ummumiy summa:</p>
                <p className="text-lg font-semibold">
                  {totalPrice.toLocaleString()} USZ
                </p>
              </div>
              <Link
                href={"/checkout"}
                className="px-4 py-2 bg-[#2e3192] text-white rounded-lg"
              >
                To‘lovga o‘tish
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="grid grid-cols-4 gap-2 items-center justify-between ">
              <Link href={"/"} className="p-4 flex flex-col items-center gap-1">
                <HomeIcon color={pathname === "/" ? "#2e3192" : "#4a5565"} />
                <span
                  className={`text-xs ${pathname === "/" ? "text-[#2e3192]" : "text-gray-600"} font-bold`}
                >
                  ASOSIY
                </span>
              </Link>
              <Link
                href={"/products"}
                className="p-4 flex flex-col items-center gap-1"
              >
                <ProductsIcon
                  color={pathname === "/products" ? "#2e3192" : "#4a5565"}
                />
                <span
                  className={`text-xs ${pathname === "/products" ? "text-[#2e3192]" : "text-gray-600"} font-bold`}
                >
                  KATALOG
                </span>
              </Link>
              <Link
                href={"/cart"}
                className="p-4 flex flex-col items-center gap-1"
              >
                <CartIcon
                  color={pathname === "/cart" ? "#2e3192" : "#4a5565"}
                />
                <span
                  className={`text-xs ${pathname === "/cart" ? "text-[#2e3192]" : "text-gray-600"} font-bold`}
                >
                  SAVAT
                </span>
              </Link>
              <Link
                href={`${isAuth ? "/profile" : "signin"}`}
                className="p-4 flex flex-col items-center gap-1"
              >
                <UserIcon
                  color={pathname === "/profile" ? "#2e3192" : "#4a5565"}
                />
                <span
                  className={`text-xs ${pathname === "/profile" ? "text-[#2e3192]" : "text-gray-600"} font-bold`}
                >
                  {isAuth ? user?.name?.toLocaleUpperCase() : "KIRISH"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
