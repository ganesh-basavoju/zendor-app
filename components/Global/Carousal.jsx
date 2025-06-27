"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";

const Carousal = ({ images }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides([...images]);
  }, [images]);

  return (
    <div className="w-full h-full relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={slide}
              alt={"slide image"}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
              className="transition-transform duration-1000 scale-105 group-hover:scale-100"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousal;
