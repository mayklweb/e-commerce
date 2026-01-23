"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { ProductType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getProducts } from "@/app/store/actions/productsAction";

function Product({ params }: { params: Promise<{ id: string }> }) {
  const dispatch = useDispatch<AppDispatch>();
  const [item, setItem] = useState<ProductType>();
  const { products } = useSelector((state: RootState) => state.products);

  const { id } = use(params);
  const Id = parseInt(id);

  useEffect(() => {
    dispatch(getProducts());
  }, [Id]);

  useEffect(() => {
    const product = products?.find((p) => p.id === Id);

    setItem(product as ProductType);
  }, [products]);

  return (
    <div>
      <section>
        <div className="mt-5">
          <div className="container">
            <div>
              <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden">
                  {/* <Image
                    src={"/product.webp"}
                    width={600}
                    height={540}
                    alt="Product Image"
                    className="w-full h-full object-cover"
                  /> */}
                  <div className="w-full h-full rounded-3xl overflow-hidden flex flex-col gap-5">
                    {item?.images.map((image: any, i) => (
                      <Image
                        key={image.id}
                        src={`https://api.bunyodoptom.uz${image.url}`}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-3xl"
                        priority
                      />
                    ))}
                  </div>
                  {/* <Image
                    // src={`https://api.bunyodoptom.uz/${product.images[0]?.url} ${}`}
                    src={
                      item?.images?.length && item.images[1]?.url
                        ? `https://api.bunyodoptom.uz${item.images[1].url}`
                        : "/product.webp" // fallback
                    }
                    width={400}
                    height={360}
                    alt="Product Image"
                  /> */}
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-2">
                  <h1 className="text-xl lg:text-4xl font-semibold tracking-tight">
                    {item?.name}
                  </h1>
                  <p className="text-lg lg:text-2xl tracking-tight">
                    {item?.price} USZ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="container">
            <div>
              <div>
                <h1>Oxshash narsalar</h1>
              </div>
              <div className="">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
