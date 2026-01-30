"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getProducts } from "@/app/store/actions/productsAction";
import { addCart, decrement, increment } from "@/app/store/slices/cartSlice";
import { MinusIcon, PlusIcon } from "@/app/shared/icons";
import { ProductsType } from "@/app/utils/types";

function Product({ params }: { params: Promise<{ id: string }> }) {
  const dispatch = useDispatch<AppDispatch>();
  const [item, setItem] = useState<ProductsType>();
  const { products } = useSelector((state: RootState) => state.products);
  const { items } = useSelector((state: RootState) => state.cart);

  const { id } = use(params);
  const Id = parseInt(id);

  useEffect(() => {
    dispatch(getProducts());
  }, [Id]);

  useEffect(() => {
    const product = products?.find((p) => p.id === Id);

    setItem(product as ProductsType);
  }, [products]);

  const cartItem = items?.find((product) => product.id === Id);
  const currentQty = cartItem?.qty || 0;
  const stockQty = item?.stock_qty ?? 0;


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
                    {/* {item?.images?.map((image: any, i) => (
                      <Image
                        key={image.id}
                        src={`https://api.bunyodoptom.uz${image.url}`}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-3xl"
                        priority
                      />
                    ))} */}
                  </div>
                  <Image
                    // src={`https://api.bunyodoptom.uz/${product.images[0]?.url} ${}`}
                    src={
                      item?.images?.length && item.images[1]?.url
                        ? `https://api.bunyodoptom.uz${item.images[1].url}`
                        : "/product.webp" // fallback
                    }
                    width={400}
                    height={360}
                    alt="Product Image"
                  />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-2">
                  <h1 className="text-xl lg:text-4xl font-semibold tracking-tight">
                    {item?.name}
                  </h1>
                  <p className="text-lg lg:text-2xl tracking-tight">
                    {item?.price} USZ
                  </p>
                </div>
                <div className="w-full lg:w-1/2">
                  {!cartItem ? (
                    <button
                      onClick={() => dispatch(addCart(item))}
                      // disabled={stockQty <= 0}
                      className="text-white w-full h-12 bg-[#2e3192] rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {stockQty <= 0 ? "OUT OF STOCK" : "SAVATGA"}
                    </button>
                  ) : (
                    <div className="w-max flex items-center gap-3 border border-solid border-black px-3 py-1 rounded-lg">
                      <button
                        onClick={() => dispatch(decrement(Id))}
                        disabled={currentQty <= 1}
                        className="disabled:opacity-50"
                      >
                        <MinusIcon />
                      </button>

                      <span>{currentQty}</span>

                      <button
                        onClick={() => dispatch(increment(Id))}
                        disabled={currentQty >= stockQty}
                        className="disabled:opacity-50"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  )}
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
