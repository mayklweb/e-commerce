"use client";

import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getProductsById } from "@/app/store/actions/productAction";
import Image from "next/image";
import {
  HomeIcon,
  LeftIcon,
  MinusIcon,
  PlusIcon,
  RightIcon,
} from "@/app/shared/icons";
import { addToCart, dec, inc } from "@/app/store/slices/cartSlice";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { getProducts } from "@/app/store/actions/productsAction";

export default function ProductClient({ id }: { id: string }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading } = useSelector((state: RootState) => state.product);
  const { products } = useSelector((state: RootState) => state.products);
  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories,
  );

  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (id) dispatch(getProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  const cartItem = cart.find((p) => String(p.id) === id);
  const currentQty = cartItem?.qty ?? 0;
  const stockQty = product?.stock_qty ?? 0;

  function shuffleArray<T>(array?: T[] | null) {
    if (!Array.isArray(array)) return [];
    return [...array].sort(() => Math.random() - 0.5);
  }

  const sameProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const shuffled = shuffleArray(products);
    return shuffled.slice(0, 10);
  }, [products]);

  if (loading) return <p>Loading...</p>;

  if (!product) return null;

  return (
    <section className="mt-24 pb-16">
      <div className="container">
        <div className="flex flex-col">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Link
                  href={"/"}
                  className="flex items-center gap-1 text-sm text-primary leading-[100%]"
                >
                  <span>
                    <HomeIcon size={16} />
                  </span>
                  <span className="text-sm text-primary">Asosiy</span>
                </Link>
              </div>
              <div>/</div>
              <div>
                <p className="text-sm text-primary">{product.name}</p>
              </div>
            </div>
            <div className="flex gap-5 flex-col lg:flex-row">
              {/* IMAGE */}
              <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden">
                <Image
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
          <div className="mt-10 mb-5 flex flex-col">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">O'xshash mahsulotlar</h1>
              <div className="flex gap-2">
                <button
                  ref={prevRef}
                  className="text-white p-1 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300"
                >
                  <LeftIcon />
                </button>

                <button
                  ref={nextRef}
                  className="text-white p-1 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300"
                >
                  <RightIcon />
                </button>
              </div>
            </div>
            <Swiper
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                // This ensures navigation works after initialization
                if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
                // Reinitialize navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              spaceBetween={16}
              slidesPerView={2.6}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                },
                640: {
                  slidesPerView: 2.4,
                },
                768: {
                  slidesPerView: 3.4,
                },
                1024: {
                  slidesPerView: 4.6,
                },
              }}
              className="w-full mt-3 lg:mt-5"
            >
              {sameProducts?.map((product, i) => (
                <SwiperSlide className="w-fit rounded-2xl" key={i}>
                  <Link
                    href={`/product/${product.id}`}
                    key={i}
                    className="w-full"
                  >
                    <div className="rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                      <Image
                        src={
                          product.images?.[0]?.url
                            ? `https://api.bunyodoptom.uz/${product.images[0].url}`
                            : "/product.webp"
                        }
                        width={400}
                        height={360}
                        alt={product.name}
                        priority
                      />
                    </div>
                    <div className="w-full mt-2 flex flex-col lg:flex-col justify-between">
                      <h1 className="text-sm lg:text-base font-semibold tracking-tight">
                        {product.name}
                      </h1>
                      <p className="text-sm lg:text-base tracking-tight">
                        {product.price} UZS
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}