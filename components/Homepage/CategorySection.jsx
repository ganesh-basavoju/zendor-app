"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Designer Wallpapers",
    description: "Exclusive, artisanal wall coverings curated from global designers",
    image: "https://2.wlimg.com/product_images/bc-full/2023/2/11673283/designer-wallpaper-1675669074-6749474.jpeg",
    link: "/category/wallpaper/All",
    badge: "New Arrivals"
  },
  {
    name: "Premium Flooring",
    description: "Sustainably-sourced hardwoods with bespoke finishes",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    link: "/category/wooden flooring/All",
    badge: "FSC Certified"
  },
  {
    name: "Acoustic Solutions",
    description: "Architect-grade sound management with customizable aesthetics",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    link: "/category/acoustics",
    badge: "Bestseller"
  },
];

const CategorySection = () => {
  const router = useRouter();

  const handleCategoryClick = (link) => {
    router.push(link);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mb-4">
            Our Collections
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Curated Design Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium solutions for every space, crafted with precision and artistry
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div 
                className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(category.link)}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  {category.badge && (
                    <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {category.badge}
                    </div>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-white/90 mb-4">{category.description}</p>
                  <div className="flex items-center text-white group-hover:text-amber-300 transition-colors">
                    <span className="text-sm font-medium mr-2">Explore Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => router.push("/collections")}
            className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
          >
            View All Categories
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;