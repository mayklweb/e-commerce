"use client";
import Link from "next/link.js";
import { SearchIcon, UserIcon, CartIcon } from "@/app/shared/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/app/store";
// import { getProducts } from "@/app/store/actions/productsAction";
// import { latinToCyrillic } from "@/app/utils/helpers";

function AppHeader  ()  {
  const path = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  // const { products } = useSelector((state: RootState) => state.products); // for categories and brands in filter drawer
  // const { user } = useSelector((state: RootState) => state.auth); // for categories and brands in filter drawer

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(latinToCyrillic(e.target.value));
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const hideHeader = ["signup", "signin", "checkout"].includes(
    path.split("/")[1],
  );

  // const filteredProducts = Array.isArray(products)
  //   ? products.filter((p) =>
  //       latinToCyrillic(p.name).includes(latinToCyrillic(query)),
  //     )
  //   : [];

  return (
    <header>
      {!hideHeader && (
        <div className=" w-full bg-white shadow-sm fixed z-10">
          <div className="container">
            <div className="relative">
              <div className="w-full flex items-center justify-between py-4">
                <div className="hidden lg:block text-center">
                  <Link href={"/"} className="w-40 h-12">
                    <Image
                      src="/logo.png"
                      width={200}
                      height={50}
                      alt="Logo"
                      className="w-44 h-10 object-cover "
                    />
                  </Link>
                </div>
                <div className="w-full flex flex-auto lg:flex-0 gap-3">
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="lg:w-100 flex flex-auto border border-primary/10 rounded-lg overflow-hidden focus-within:border-secondary transition-all ease-in-out duration-300">
                      <div className="flex flex-auto px-3 py-2">
                        <input
                          // onChange={handleChange}
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
                <div className="hidden lg:flex items-center gap-5">
                  <Link
                    href={"/profile"}
                    className="text-xs flex flex-row items-center gap-1 bg-primary/10 px-5 py-2.5 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
                  >
                    <UserIcon className="text-primary w-6 h-6" />
                    <span className="text-[16px] text-primary font-semibold capitalize">
                      {"Muhammad"}
                    </span>
                  </Link>
                  <Link
                    href={"/cart"}
                    className="text-xs flex flex-row items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
                  >
                    <span>
                      <CartIcon className="text-primary w-6 h-6" />
                    </span>
                    <span className="text-[16px] text-primary font-semibold capitalize">
                      Savat
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* {query && (
            <div className="bg-white py-4 pb-4 absolute max-w-100 w-full h-[60vh] overflow-y-scroll left-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-18 z-10 ">
              <div className="container">
                <div className="flex flex-col gap-2">
                  {filteredProducts.map((p) => (
                    <Link
                      href={`/product/${p.id}`}
                      className="flex gap-4 border-b pb-2"
                    >
                      <div className="w-30 h-22 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src="/product.webp"
                          alt="Logo"
                          width={120}
                          height={100}
                        />
                      </div>
                      <div>
                        <h3 className="text font-semibold text-ellipsis">
                          {p.name}
                        </h3>
                        <p className="text-base text-gray-500">{p.price} USZ</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )} */}
        </div>
      )}
    </header>
  );
};

export default AppHeader