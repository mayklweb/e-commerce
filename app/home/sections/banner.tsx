"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";

function Banner() {
  return (
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
  );
}

export default Banner;
