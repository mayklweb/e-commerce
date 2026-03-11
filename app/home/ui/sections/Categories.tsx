"use client"
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

function Categories() {
  const { data: categories, isLoading, isError } = useCategories();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;


  return (
    <section>
      <div className="container">
        {/* <div className="mt-6 mb-10 grid grid-cols-10 gap-2">
          {categories.map((category: CategoriesType) => (
            // <button onClick={() => handleCategoryClick(name)} key={id}>
            //   <div
            //     key={id}
            //     className="bg-transparent rounded-xl flex items-center justify-center flex-col gap-1 cursor-pointer"
            //   >
            //     <div className="p-2 bg-[#CECFFF] rounded-xl flex items-center justify-center">
            //       <Image
            //         src="/logo1.svg"
            //         alt="categories"
            //         width={50}
            //         height={50}
            //       />
            //     </div>
            //     <p className="text-sm lg:text-lg font-medium text-[#2e3192]">
            //       {name}
            //     </p>
            //   </div>
            // </button>
            <CategoryCard category={category} />
          ))}
        </div> */}
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
              spaceBetween={20}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 2.7,
                },
                425: {
                  slidesPerView: 3.4,
                },
                640: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 7,
                },
              }}
              className="w-full mt-3 lg:mt-5"
            >
              {categories
                .slice(1)
                .map(({ name, id }: CategoriesType, i: number) => (
                  <SwiperSlide className="w-35 rounded-2xl">
                    <Link
                      href={`/products`}
                      key={i}
                      className="w-25 lg:w-35 rounded-lg lg:rounded-2xl bg-primary/10 flex shrink-0"
                    >
                      <div className="w-25 lg:w-35 p-2 rounded-md lg:rounded-lg overflow-hidden shrink-0">
                        <div className="w-full h-14 lg:w-31 lg:h-22 rounded-sm lg:rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={`/${id}.jpg`}
                            width={124}
                            height={90}
                            alt={name}
                            priority
                          />
                        </div>
                        <p className="w-full pt-2 text-xs lg:text-sm text-primary text-center font-semibold">
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

export default Categories;
