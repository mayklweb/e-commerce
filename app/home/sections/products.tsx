"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { ProductImageType, ProductType } from "@/app/utils/types";

function normalizeProducts(products: ProductType[]): ProductType[] {
  return products
    .filter(
      (p) => Array.isArray(p.images) && p.images.length > 0 && p.images[0]?.url,
    )
    .map((p) => ({
      ...p,
      mainImage:
        `https://api.bunyodoptom.uz${(p?.images as ProductImageType[])[0]?.url}` &&
        `https://api.bunyodoptom.uz${(p?.images as ProductImageType[])[1]?.url}`,
    }));
}

function Products() {
  const { products } = useSelector((state: RootState) => state.products);
  const normalizedProducts = useMemo(
    () => normalizeProducts(products),
    [products],
  );

  useEffect(() => {
    normalizeProducts(products);
  }, [products]);

  // function shuffleArray<T>(array?: T[] | null) {
  //   if (!Array.isArray(array)) return [];
  //   return [...array].sort(() => Math.random() - 0.5);
  // }

  // const homeProducts = useMemo(() => {
  //   if (!products || products.length === 0) return [];

  //   const shuffled = shuffleArray(products);
  //   return shuffled.slice(0, 10);
  // }, [products]);

  return (
    <section>
      <div className="mt-5 lg:mt-10">
        <div className="container">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
              Sizga yoqadiganlari
            </h1>
          </div>
          <div className="mt-3 lg:mt-5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4">
            {normalizedProducts.map((product, i) => (
              <Link href={`/product/${product.id}`} key={i} className="w-full">
                <div className="rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden">
                  <Image
                    src={
                      product.images?.[1]?.url
                        ? `https://api.bunyodoptom.uz${product.images[1].url}`
                        : `https://api.bunyodoptom.uz${(product.images as ProductImageType[])[0].url}`
                    }
                    width={400}
                    height={360}
                    alt={product.name}
                    priority
                  />
                </div>
                <div className="w-full mt-2 flex flex-col lg:flex-col justify-between">
                  <h1 className="text-sm lg:text-base text-[#283745] font-bold tracking-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm lg:text-base text-[#283745] font-semibold tracking-tight">
                    {product.price} USZ
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <Link
              href="/products"
              className="w-full block text-center mt-5 py-3 text-accent bg-primary rounded-xl font-semibold"
            >
              YANA KO'RISH
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
