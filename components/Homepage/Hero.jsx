"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const slides = [
    {
      image: "https://www.ddecor.com/media/wysiwyg/MODERN_METALLICS_1_main.jpg", // wallpaper
      label: "Designer Wallpapers",
      description: "Elevate your walls with artistic and timeless designs",
      buttonText: "View Wallpapers",
      link:"/category/wallpaper/All"
    },
    {
      image: "https://www.lifecoreflooring.com/wp-content/uploads/2019/04/Kitchen-Hardwood-Flooring-Options.png", // wooden flooring
      label: "Premium Wooden Floorings",
      description: "Timeless elegance and durability for your dream space",
      buttonText: "Explore Floorings",
      link:"/category/wooden flooring/All"
    },
    {
      image: "https://www.thefloorgallery.sg/wp-content/uploads/acoustic-wall-panels-balancing-sound-and-design-in-modern-spaces.jpg", // acoustic panels
      label: "Aesthetic Acoustic Panels",
      description: "Reduce noise, enhance style — perfect for modern interiors",
      buttonText: "Discover Acoustics",
      link:"/category/acoustics"
    }
  ];
  

  return (
    <section className="w-full h-[500px] sm:h-[600px] md:h-[800px] relative overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full group"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.label}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              className="transition-transform duration-1000 scale-105 group-hover:scale-100"
            />

            {/* Content Section */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <span className="inline-block text-amber-400 font-medium tracking-wider text-sm sm:text-base lg:text-lg uppercase">
                      Premium Collection
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md">
                      {slide.label}
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md max-w-md">
                    {slide.description}
                  </p>
                  <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      onClick={() => navigate(slide.link)} 
                      className="w-full cursor-pointer sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      {slide.buttonText}
                    </Button>
                    <Button 
                      onClick={() => navigate('/visit-store')} 
                      className="w-full cursor-pointer sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 rounded-md transition-all duration-300"
                    >
                      Visit Store
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;