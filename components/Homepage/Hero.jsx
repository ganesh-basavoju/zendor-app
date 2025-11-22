"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };

  const slides = [
    {
      image: "https://www.ddecor.com/media/wysiwyg/MODERN_METALLICS_1_main.jpg",
      label: "Designer Wallpapers",
      description: "Elevate your walls with exclusive, artisanal designs curated by international artists",
      buttonText: "Explore Wallpapers",
      link: "/category/wallpaper/All",
      badge: "New Collection"
    },
    {
      image: "https://www.lifecoreflooring.com/wp-content/uploads/2019/04/Kitchen-Hardwood-Flooring-Options.png",
      label: "Premium Wooden Flooring",
      description: "Sustainably sourced hardwoods with bespoke finishes for luxury interiors",
      buttonText: "View Flooring Options",
      link: "/category/wooden flooring/All",
      badge: "FSC Certified"
    },
    {
      image: "https://www.thefloorgallery.sg/wp-content/uploads/acoustic-wall-panels-balancing-sound-and-design-in-modern-spaces.jpg",
      label: "Acoustic Solutions",
      description: "Architect-grade sound management with customizable aesthetic panels",
      buttonText: "Discover Acoustics",
      link: "/category/acoustics",
      badge: "Bestseller"
    }
  ];

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image with Parallax Effect */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
            >
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </motion.div>

            {/* Content Section */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-2xl"
                >
                  {slide.badge && (
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 mb-6">
                      {slide.badge}
                    </span>
                  )}

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    <span className="block">{slide.label}</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-white">
                      Redefine Your Space
                    </span>
                  </h1>

                  <p className="text-lg text-white/90 mb-8 max-w-lg">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => navigate(slide.link)}
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {slide.buttonText}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/visit-store')}
                      className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-medium"
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Bala Nagireddy sir
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scrolling Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-white text-sm mb-2">Explore More</span>
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      {/* Overlay Branding */}
      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg">
          <p className="text-white/80 text-sm">Zendor Interiors</p>
          <p className="text-white font-medium">Since 2010</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;