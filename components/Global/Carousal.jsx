"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Carousal = ({images}) => {

  const [slides,setSlides] =useState([]);
  console.log(images);
  useEffect(() => {
    setSlides([...images]);
  },[])
  

  return (
    <section className="w-full h-full relative overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="h-full group"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div> */}

            {/* Background Image */}
            <Image
              src={slide}
              alt={"slide image"}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              className="transition-transform duration-1000 scale-105 group-hover:scale-100"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousal;