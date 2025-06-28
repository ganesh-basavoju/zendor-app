"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Designer Wallpapers",
    description: "Artistic wall coverings for modern, luxury spaces",
    link: "/category/wallpaper/All",
    img: "https://cdn11.bigcommerce.com/s-5gk3908h6p/images/stencil/original/image-manager/w0183-01-room-.jpg",
    badge: "Exclusive Designs"
  },
  {
    name: "Acoustic  Panels",
    description: "Stylish sound-absorbing panels that elevate any room",
    link: "/accoustics",
    img: "https://carltonbale.com/wp-content/uploads/2014/04/home_theater_acoustic_room_design.jpg",
    badge: "Tech+Style"
  },
  {
    name: "Engineered Wooden Flooring",
    description: "Durable, elegant wood floors crafted for timeless interiors",
    link: "/category/wooden-flooring/All",
    img: "https://media.houseandgarden.co.uk/photos/61893bbea4c7bfe01adfefe2/1:1/w_1666,h_1666,c_limit/hallway_117.jpg",
    badge: "FSC Certified"
  },
  
];

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1,
};

const AllTypesSection = () => {
  const router = useRouter();

  const handleCategoryClick = (link) => {
    router.push(link);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Curated Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover our exclusive range of premium interior solutions favored by luxury developers and design firms
          </motion.p>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-full"
          columnClassName="pl-6 bg-clip-padding"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8 cursor-pointer group"
              onClick={() => handleCategoryClick(category.link)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                <div className="aspect-[4/5] w-full relative">
                  <Image
                    src={category.img}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {category.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                      {category.badge}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-amber-300 font-medium"
                    >
                      <span>Explore Collection</span>
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push('/collections')}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center mx-auto"
          >
            View All Collections
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AllTypesSection;