"use client";
import { CategoriesType } from "@/app/types";
import { useCategories } from "@/app/shared/lib/hooks/useCategories";
import { CategoryCard } from "@/app/components";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import { LeftIcon, RightIcon } from "@/app/shared/icons";
import Link from "next/link";
import Image from "next/image";

function Brands() {
  const { data: categories, isLoading, isError } = useCategories();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section>
      <div className="container">
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
              Kategoriya
            </h1>
            <div className="flex items-center gap-2">
              <button
                ref={prevRef}
                className="text-primary bg-secondary p-1 rounded-full cursor-pointer"
              >
                <LeftIcon />
              </button>

              <button
                ref={nextRef}
                className="text-primary bg-secondary p-1 rounded-full cursor-pointer"
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
              spaceBetween={12}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                0: { slidesPerView: 2.5, spaceBetween: 8 },
                375: { slidesPerView: 3.2, spaceBetween: 10 },
                425: { slidesPerView: 3.5, spaceBetween: 10 },
                640: { slidesPerView: 4.5, spaceBetween: 12 },
                768: { slidesPerView: 5.5, spaceBetween: 14 },
                1024: { slidesPerView: 7, spaceBetween: 16 },
                1280: { slidesPerView: 8, spaceBetween: 20 },
                1536: { slidesPerView: 10, spaceBetween: 20 },
              }}
              className="w-full mt-3 lg:mt-5"
            >
              {categories
                .slice(1)
                .map(({ name, id }: CategoriesType, i: number) => (
                  <SwiperSlide key={i}>
                    <Link
                      href="/products"
                      className="flex flex-col items-center rounded-xl bg-primary/10 overflow-hidden"
                    >
                      <div className="w-full p-1.5 sm:p-2">
                        <div className="relative w-full aspect-4/3 rounded-md overflow-hidden">
                          <Image
                            src={`/${id}.jpg`}
                            fill
                            sizes="(max-width: 640px) 30vw, (max-width: 1024px) 15vw, 10vw"
                            alt={name}
                            className="object-cover"
                            priority
                          />
                        </div>
                        <p className="w-full pt-1.5 text-[10px] sm:text-xs lg:text-sm text-primary text-center font-semibold line-clamp-2">
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
    </section>
  );
}

export default Brands;
