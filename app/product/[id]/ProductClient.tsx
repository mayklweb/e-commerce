"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getProductsById } from "@/app/store/actions/productAction";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "@/app/shared/icons";
import { addToCart, dec, inc } from "@/app/store/slices/cartSlice";

export default function ProductClient({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading } = useSelector((state: RootState) => state.product);

  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (id) dispatch(getProductsById(id));
  }, [dispatch, id]);

  const cartItem = cart.find((p) => String(p.id) === id);
  const currentQty = cartItem?.qty ?? 0;
  const stockQty = product?.stock_qty ?? 0;

  if (loading) return <p>Loading...</p>;
  if (!product) return null; // loading yoki not found

  return (
    <section className="mt-5">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden">
            <Image
              // src={
              //   product.images?.[0]?.url
              //     ? `https://api.bunyodoptom.uz${product.images[0].url}`
              //     : "/product.webp"
              // }
              src={
                product.images?.length && product.images[0]?.url
                  ? `https://api.bunyodoptom.uz${product.images[0].url}`
                  : "/product.webp" // fallback
              }
              alt={product.name}
              width={500}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* INFO */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <h1 className="text-2xl lg:text-4xl font-semibold">
              {product.name}
            </h1>
            <p className="text-xl lg:text-2xl">{product.price} UZS</p>

            {!cartItem ? (
              <button
                onClick={() => dispatch(addToCart(product))}
                disabled={stockQty <= 0}
                className="h-12 bg-[#2e3192] text-white rounded-lg disabled:bg-gray-400"
              >
                {stockQty <= 0 ? "OUT OF STOCK" : "SAVATGA"}
              </button>
            ) : (
              <div className="w-max flex products-center gap-3 border px-3 py-1 rounded-lg">
                <button
                  onClick={() => dispatch(dec(product.id))}
                  disabled={currentQty <= 1}
                >
                  <MinusIcon />
                </button>

                <span>{currentQty}</span>

                <button
                  onClick={() => dispatch(inc(product.id))}
                  disabled={currentQty >= stockQty}
                >
                  <PlusIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
