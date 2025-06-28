"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const featuredCollections = [
  {
    image: "https://images.squarespace-cdn.com/content/v1/5de003332625a4608a097bcb/e1f8c12d-945d-49c9-9466-ce3a812ba96f/Sarah%2Barnett%2Binterior%2Bmoons.jpg",
    title: "Designer Wallpapers",
    description: "Exclusive, limited-edition wallcoverings from renowned international designers",
    link: "/category/wallpaper/All",
    badge: "New Collection"
  },
  {
    image: "https://www.flooringinc.com/media/magefan_blog/2020/11/7800.jpg",
    title: "Artisan Flooring",
    description: "Handcrafted hardwood floors with bespoke finishes for discerning clients",
    link: "/category/wooden flooring/All",
    badge: "Sustainable"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0067/8078/0634/files/home-theatre-package.jpg?v=1710851638",
    title: "Acoustic Excellence",
    description: "Custom-engineered sound solutions that blend performance with aesthetics",
    link: "/category/acoustics",
    badge: "Bestseller"
  },
];

const ImageSlider = () => {
  const router = useRouter();

  const handleCollectionClick = (link) => {
    router.push(link);
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
        >
          <div className="mb-6 md:mb-0">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              Curated Selections
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Signature Collections
            </h2>
          </div>
          <button
            onClick={() => router.push("/collections")}
            className="flex items-center text-gray-900 hover:text-blue-600 transition-colors group"
          >
            <span className="font-medium">View All Collections</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            speed={1000}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl"
          >
            {featuredCollections.map((collection, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => handleCollectionClick(collection.link)}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "linear" }}
                >
                  {/* Image with Parallax Effect */}
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={100}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                    {collection.badge && (
                      <span className="inline-block px-3 py-1 bg-white text-gray-900 text-xs font-medium rounded-full mb-4">
                        {collection.badge}
                      </span>
                    )}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                    >
                      {collection.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg text-white/90 mb-6 max-w-2xl"
                    >
                      {collection.description}
                    </motion.p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollectionClick(collection.link);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Collection
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}

            {/* Navigation Arrows */}
            <div className="swiper-button-next after:text-white hover:after:text-blue-300 after:transition-colors"></div>
            <div className="swiper-button-prev after:text-white hover:after:text-blue-300 after:transition-colors"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;