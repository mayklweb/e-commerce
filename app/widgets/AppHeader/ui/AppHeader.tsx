"use client";
import Link from "next/link.js";
import { SearchIcon, UserIcon, CartIcon, FilterIcon } from "@/app/shared/icons";
import { usePathname } from "next/navigation";
import { FilterDrawer } from "@/app/products/ui";

export const AppHeader = () => {
  const path = usePathname();

  const categories =[
    {
      id: 1,
      name: "Cookies"
    }
  ]

  const brands = [
    {
      id: 1,
      name: "Krafers"
    }
  ]
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
            <div className="w-full flex flex-auto lg:flex-0 gap-3">
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
              {/* <FilterDrawer categories={categories} brands={brands}/> */}
              {/* {path.split("/")[1] === "products" && (
                <button className="text-xs flex flex-col items-center gap-1 bg-primary/10 px-2.5 py-2 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300">
                  <FilterIcon />
                </button>
              )} */}
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
