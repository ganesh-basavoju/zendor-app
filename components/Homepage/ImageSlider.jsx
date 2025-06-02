"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

const data = [
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/5de003332625a4608a097bcb/e1f8c12d-945d-49c9-9466-ce3a812ba96f/Sarah%2Barnett%2Binterior%2Bmoons.jpg",
    title: "Designer Wallpapers",
    description: "Transform your walls with elegant and artistic designs",
    link: "/category/wallpaper/All",
  },
  {
    image: "https://www.flooringinc.com/media/magefan_blog/2020/11/7800.jpg",
    title: "Wooden Floorings",
    description: "Durable and stylish wood flooring for a luxurious touch",
    link: "/category/wooden flooring/All",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0067/8078/0634/files/home-theatre-package.jpg?v=1710851638",
    title: "Acoustic Solutions",
    description: "Modern acoustic panels for peaceful and productive spaces",
    link: "/category/acoustics",
  },
];

const ImageSlider = () => {
  const router = useRouter();

  const handleCollectionClick = (link) => {
    router.push(link);
  };

  return (
    <section className="relative w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured Collections
          </h2>
          {/* <Link
            href="/products/explore"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            View All Collections →
          </Link> */}
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          className="w-full aspect-[16/9]"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-full group cursor-pointer"
                onClick={() => handleCollectionClick(item.link)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-white/90 mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform delay-75">
                    {item.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCollectionClick(item.link);
                    }}
                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Explore Collection
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImageSlider;
