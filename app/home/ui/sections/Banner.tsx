import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

function Banner() {
  return (
    <section>
      <div className='container'>
        <div className='w-full h-[220px] rounded-3xl lg:rounded-2xl overflow-hidden'>
          <Swiper pagination={true} spaceBetween={30} modules={[Pagination]} className="w-full h-full">
            <SwiperSlide className='bg-black rounded-lg lg:rounded-2xl'>Slide 1</SwiperSlide>
            <SwiperSlide className='bg-black rounded-lg lg:rounded-2xl'>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section >
  )
}

export default Banner