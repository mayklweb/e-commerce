"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import { LeftIcon, RightIcon } from "@/app/shared/icons";
import { getCategories } from "@/app/store/actions/categoriesAction";
import { AppDispatch, RootState } from "@/app/store";

function Categories() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <section>
      <div className="mt-5 lg:mt-10">
        <div className="container">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                Kategoriya
              </h1>
              <div className="">
                <button
                  ref={prevRef}
                  className="text-white p-1 rounded-full cursor-pointer"
                >
                  <LeftIcon />
                </button>

                <button
                  ref={nextRef}
                  className="text-white p-1 rounded-full cursor-pointer"
                >
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
  );
}

export default Categories;
