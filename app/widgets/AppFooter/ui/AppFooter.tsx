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

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0,
  );

  return (
    <footer>
      <div className="w-full bg-[#ffffff] shadow-[0px_-1px_6px_0px_rgba(0,0,0,0.1)] rounded-2xl fixed bottom-0 lg:hidden">
        <div
          className={`w-full bg-white rounded-t-2xl p-3 border-b ${
            pathname === "/checkout" ? "block" : "hidden"
          }`}
        >
          {/* <div className="container"> */}
            <div className="flex items-center justify-between">
              <button className="w-full p-3 bg-[#2e3192] text-white rounded-xl">
                Rasmiylashtirish
              </button>
            </div>
          {/* </div> */}
        </div>
        <div
          className={`w-full bg-white rounded-t-2xl py-3 border-b ${
            pathname === "/cart" ? "block" : "hidden"
          }`}
        >
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="">
                <p className="text-xs">Ummumiy summa:</p>
                <p className="font-semibold">
                  {totalPrice.toLocaleString()} USZ
                </p>
              </div>
              <Link
                href={"/checkout"}
                className="p-2 bg-[#2e3192] text-white rounded-lg"
              >
                Rasmiylashtirish
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="grid grid-cols-4 gap-2 items-center justify-between ">
              <Link href={"/"} className="p-4 flex flex-col items-center gap-1">
                <HomeIcon />
                <span className="text-xs text-ring font-semibold">
                  ASOSIY
                </span>
              </Link>
              <Link
                href={"/products"}
                className="p-4 flex flex-col items-center gap-1"
              >
                <ProductsIcon />
                <span className="text-xs text-ring font-semibold">
                  KATALOG
                </span>
              </Link>
              <Link
                href={"/cart"}
                className="p-4 flex flex-col items-center gap-1"
              >
                <CartIcon />
                <span className="text-xs text-gray-600 font-bold">
                  SAVAT
                </span>
              </Link>
              <Link
                href={`${isAuth ? "/profile" : "signin"}`}
                className="p-4 flex flex-col items-center gap-1"
              >
                <UserIcon />
                <span className="text-xs text-ring font-semibold">
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
