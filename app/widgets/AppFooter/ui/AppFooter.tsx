"use client";

import Link from "next/link";
import { CartIcon, HomeIcon, ProductsIcon, UserIcon } from "@/app/shared/icons";
// import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const AppFooter = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  console.log(isAuth);

  return (
    <footer>
      <div className="w-full bg-[#ffffff] shadow-[0px_-1px_6px_0px_rgba(0,0,0,0.1)] fixed bottom-0 lg:hidden">
        <div className="container">
          <div className="grid grid-cols-4 gap-2 items-center justify-between ">
            <Link href={"/"} className="p-4 flex flex-col items-center gap-1">
              <HomeIcon />
              <span className="text-xs text-primary font-semibold">ASOSIY</span>
            </Link>
            <Link
              href={"/products"}
              className="p-4 flex flex-col items-center gap-1"
            >
              <ProductsIcon />
              <span className="text-xs text-primary font-semibold">
                KATALOG
              </span>
            </Link>
            <Link
              href={"/cart"}
              className="p-4 flex flex-col items-center gap-1"
            >
              <CartIcon />
              <span className="text-xs text-primary font-semibold">SAVAT</span>
            </Link>
            <Link
              href={`${isAuth ? "/profile" : "signin"}`}
              className="p-4 flex flex-col items-center gap-1"
            >
              <UserIcon />
              <span className="text-xs text-primary font-semibold">
                {isAuth ? user?.name?.toLocaleUpperCase() : "KIRISH"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
