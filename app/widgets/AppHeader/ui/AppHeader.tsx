"use client";
import Link from "next/link.js";
import { SearchIcon, UserIcon, CartIcon } from "@/app/shared/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getProducts } from "@/app/store/actions/productsAction";
import { latinToCyrillic } from "@/app/utils/helpers";

export const AppHeader = () => {
  const path = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const { products } = useSelector((state: RootState) => state.products); // for categories and brands in filter drawer
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(latinToCyrillic(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const hideHeader = ["signup", "signin", "checkout", "cart", 'profile'].includes(
    path.split("/")[1],
  );

  const filteredProducts = Array.isArray(products)
    ? products.filter((p) =>
        latinToCyrillic(p.name).includes(latinToCyrillic(query)),
      )
    : [];

  console.log(filteredProducts.length);

  return (
    <header>
      {!hideHeader && (
        <div className="w-full bg-white shadow-sm fixed z-10">
          <div className="container">
            <div className="relative">
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
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="xl:w-100 flex flex-auto border border-primary/10 rounded-lg overflow-hidden focus-within:border-secondary transition-all ease-in-out duration-300">
                      <div className="flex flex-auto px-3 py-2">
                        <input
                          onChange={handleChange}
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
          {query && (
            <div className="bg-white py-4 pb-4 absolute w-full h-64 overflow-x-scroll left-0 top-18 z-10 ">
              <div className="container">
                <div className="flex flex-col gap-2">
                  {filteredProducts.map((p) => (
                    <Link href={`/product/${p.id}`} className="flex gap-4 border-b pb-2">
                      <div className="w-30 h-22 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src="/product.webp"
                          alt="Logo"
                          width={120}
                          height={100}
                        />
                      </div>
                      <div>
                        <h3 className="text font-semibold text-ellipsis">{p.name}</h3>
                        <p className="text-base text-gray-500">{p.price} USZ</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
