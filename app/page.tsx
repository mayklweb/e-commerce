"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { getProducts } from "./store/actions/productsAction";
import { useEffect, useMemo, useState } from "react";
import { getCategories } from "./store/actions/categoriesAction";
import { getBrands } from "./store/actions/brandsAction";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  function shuffleArray<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const homeProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const shuffled = shuffleArray(products);
    return shuffled.slice(0, 10);
  }, [products]);

  console.log(homeProducts);

  return (
    <div className="mb-20">
      <section>
        <div className="mt-5">
          <div className="container">
            <div className="rounded-4xl overflow-hidden">
              <div className="bg-primary pb-[45%]"></div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10">
          <div className="container">
            <div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                  CATEGORY
                </h1>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
                <div className="w-full h-20 rounded-2xl lg:rounded-3xl bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10">
          <div className="container">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                PRODUCTS
              </h1>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {homeProducts.map((product, i) => (
                <Link href={`/product/${product.id}`} key={i} className="w-full">
                  <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                    <Image
                      // src={`https://api.bunyodoptom.uz/${product.images[0]?.url} ${}`}
                      src={
                        product.images[0]
                          ? `https://api.bunyodoptom.uz/${product.images[0]?.url}`
                          : "/product.webp" // fallback
                      }
                      width={400}
                      height={360}
                      alt="Product Image"
                    />
                  </div>
                  <div className="w-full mt-2 flex flex-col lg:flex-row lg:items-center justify-between">
                    <h1 className="text-base lg:text-lg tracking-tight">
                      {product.name}
                    </h1>
                    <p className="text-base tracking-tight">
                      {product.price} USZ
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <button className="w-full mt-5 py-3 text-accent bg-primary rounded-xl font-semibold">YANA KO'RISH</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
