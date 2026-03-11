"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/shared/api/apiServices";
import { ProductsType } from "@/app/types";
import Image from "next/image";

export default function ProductsClient({ id }: { id: number }) {
  const {
    data: products,
    isError,
    error,
    isLoading,
  } = useQuery<ProductsType[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const product = products?.find((p) => p.id === id);

  return (
    <section>
      <div className="container">
        <div className="mt-5">
          <div>
            <div className="rounded-3xl overflow-hidden w-full h-60">
              <Image
                className="w-full h-full object-cover"
                src="/cookie.webp"
                alt="product"
                width={300}
                height={200}
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-medium mt-4">Product Name</h1>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-semibold">25 000 USZ</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {/* {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.price}</p>
          <img src={product.photo} alt={product.name} />
        </div>
      ) : (
        <p>Product not found.</p>
      )} */}
    </section>
  );
}
