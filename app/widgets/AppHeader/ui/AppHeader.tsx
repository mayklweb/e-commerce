"use client";
import Link from "next/link.js";
import { SearchIcon, UserIcon, CartIcon } from "@/app/shared/icons";

export const AppHeader = () => {
  return (
    <header>
      <div className="w-full bg-white shadow-sm">
        <div className="container">
          <div className="w-full flex items-center justify-between py-4">
            <div className="hidden xl:block text-center">
              <Link
                href={"/"}
                className="font-bold tracking-tight leading-[100%] text-gray"
              >
                BUNYOD <br /> OPTOM
              </Link>
            </div>
            <div className="w-full flex flex-auto lg:flex-0">
              <form className="w-full">
                <div className="xl:w-100 flex flex-auto border border-primary/10 rounded-lg overflow-hidden focus-within:border-secondary transition-all ease-in-out duration-300">
                  <div className="flex flex-auto px-3 py-2">
                    <input
                      placeholder="Shirinlik..."
                      className="outline-none w-full"
                      type="text"
                    />
                  </div>
                  <button
                    className="text-sm text-primary font-semibold px-2.5 bg-primary/10 rounded-md hover:bg-secondary transition-all ease-in-out duration-300"
                    type="submit"
                  >
                    <span>
                      <SearchIcon />
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden xl:flex items-center gap-5">
              <Link
                href={"/signup"}
                className="text-xs flex flex-col items-center gap-1 bg-primary/10 p-2.5 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
              >
                <UserIcon />
              </Link>
              <Link
                href={"/cart"}
                className="text-xs flex flex-col items-center gap-1 bg-primary/10 p-2.5 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
              >
                <CartIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
