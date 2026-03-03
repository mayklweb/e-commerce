"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { getProducts } from "./store/actions/productsAction";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCategories } from "./store/actions/categoriesAction";
import { getBrands } from "./store/actions/brandsAction";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";
import { LeftIcon, RightIcon } from "./shared/icons";

export default function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  function shuffleArray<T>(array?: T[] | null) {
    if (!Array.isArray(array)) return []; // agar array bo‘lmasa bo‘sh array qaytar
    return [...array].sort(() => Math.random() - 0.5);
  }

  const homeProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const shuffled = shuffleArray(products);
    return shuffled.slice(0, 10);
  }, [products]);

  return (
    <div className="mt-20 pb-24">
      <section>
        <div className="mt-5">
          <div className="container">
            <div className="rounded-2xl lg:rounded-4xl overflow-hidden relative">
              <Swiper
                cssMode={true}
                loop={true}
                spaceBetween={20}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="w-full h-full ronuded-2xl lg:rounded-4xl overflow-hidden"
              >
                <SwiperSlide className=" rounded-2xl overflow-hidden">
                  <Image width={1368} height={615} src="/banner-1.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide className=" rounded-2xl overflow-hidden">
                  <Image width={1368} height={615} src="/banner-2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide className=" rounded-2xl overflow-hidden">
                  <Image width={1368} height={615} src="/banner-3.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide className=" rounded-2xl overflow-hidden">
                  <Image width={1368} height={615} src="/banner-4.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide className=" rounded-2xl overflow-hidden">
                  <Image width={1368} height={615} src="/banner-5.jpg" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-5 lg:mt-10">
          <div className="container">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                  Kategoriya
                </h1>
                <div className="">
                  <button ref={prevRef} className="text-white p-1 rounded-full cursor-pointer">
                    <LeftIcon />
                  </button>

                  <button ref={nextRef} className="text-white p-1 rounded-full cursor-pointer">
                    <RightIcon />
                  </button>
                </div>
              </div>
              <div className="relative">
                <Swiper
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation === "object") {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }
                  }}
                  spaceBetween={20}
                  slidesPerView={2.4}
                  modules={[Autoplay, Navigation]}
                  className="w-full mt-3 lg:mt-5"
                >
                  {categories.slice(1).map(({ name }, i) => (
                    <SwiperSlide className="w-fit rounded-2xl">
                      <Link
                        href={`/products`}
                        key={i}
                        className="w-fit rounded-lg lg:rounded-2xl bg-primary/10 flex shrink-0"
                      >
                        <div className="w-fit p-2 rounded-md lg:rounded-xl overflow-hidden shrink-0">
                          <div className="w-30 h-20 lg:w-60 lg:h-40 rounded-sm lg:rounded-2xl overflow-hidden shrink-0">
                            <Image
                              src={"/product.webp"}
                              width={240}
                              height={180}
                              alt={name}
                            />
                          </div>
                          <p className="w-full pt-2 text-xs lg:text-base text-primary text-center font-semibold">
                            {name}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-5 lg:mt-10">
          <div className="container">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                Sizga yoqadiganlari
              </h1>
            </div>
            <div className="mt-3 lg:mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {homeProducts.map((product, i) => (
                <Link
                  href={`/product/${product.id}`}
                  key={i}
                  className="w-full"
                >
                  <div className="rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
                    <Image
                      src={
                        product.images?.[0]?.url
                          ? `https://api.bunyodoptom.uz/${product.images[0].url}`
                          : "/product.webp"
                      }
                      width={400}
                      height={360}
                      alt={product.name}
                    />
                  </div>
                  <div className="w-full mt-2 flex flex-col lg:flex-row lg:items-center justify-between">
                    <h1 className="text-sm lg:text-base font-semibold tracking-tight">
                      {product.name}
                    </h1>
                    <p className="text-sm lg:text-base tracking-tight">
                      {product.price} USZ
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <button className="w-full mt-5 py-3 text-accent bg-primary rounded-xl font-semibold">
                YANA KO'RISH
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
