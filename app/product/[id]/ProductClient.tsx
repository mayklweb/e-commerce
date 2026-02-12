"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getProducts } from "@/app/store/actions/productsAction";
import { addToCart, dec, inc } from "@/app/store/slices/cartSlice";
import { MinusIcon, PlusIcon } from "@/app/shared/icons";

function Product({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();

  const Id = Number(params.id);

  const { products } = useSelector((state: RootState) => state.products);
  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const item = useMemo(
    () => products?.find((p) => p.id === Id),
    [products, Id],
  );

  const cartItem = cart.find((p) => p.id === Id);
  const currentQty = cartItem?.qty ?? 0;
  const stockQty = item?.stock_qty ?? 0;

  if (!item) return null; // loading yoki not found

  return (
    <section className="mt-5">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden">
            <Image
              src={
                item.images?.[0]?.url
                  ? `https://api.bunyodoptom.uz${item.images[0].url}`
                  : "/product.webp"
              }
              width={500}
              height={400}
              alt={item.name}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* INFO */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <h1 className="text-2xl lg:text-4xl font-semibold">{item.name}</h1>
            <p className="text-xl lg:text-2xl">{item.price} UZS</p>

            {!cartItem ? (
              <button
                onClick={() => dispatch(addToCart(item))}
                disabled={stockQty <= 0}
                className="h-12 bg-[#2e3192] text-white rounded-lg disabled:bg-gray-400"
              >
                {stockQty <= 0 ? "OUT OF STOCK" : "SAVATGA"}
              </button>
            ) : (
              <div className="w-max flex items-center gap-3 border px-3 py-1 rounded-lg">
                <button
                  onClick={() => dispatch(dec(Id))}
                  disabled={currentQty <= 1}
                >
                  <MinusIcon />
                </button>

                <span>{currentQty}</span>

                <button
                  onClick={() => dispatch(inc(Id))}
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

export default Product;
