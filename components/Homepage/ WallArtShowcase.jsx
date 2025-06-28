"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Palette, Ruler } from "lucide-react";

const WallArtShowcase = () => {
  const router = useRouter();

  const wallArts = [
    {
      src: "https://cdn.pixabay.com/photo/2017/06/19/10/24/indoor-2418846_1280.jpg",
      title: "Textured Canvas",
      description: "Hand-embroidered contemporary pieces",
      badge: "Bestseller"
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/04/22/18/50/frames-6199828_960_720.jpg",
      title: "Gallery Walls",
      description: "Curated collections for statement walls",
      badge: "New Arrival"
    },
    {
      src: "https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_960_720.jpg",
      title: "Metallic Accents",
      description: "Luxury finishes with gold/silver leaf",
      badge: "Limited Edition"
    },
    {
      src: "https://cdn.pixabay.com/photo/2020/10/19/11/43/home-5667529_1280.jpg",
      title: "Oversized Murals",
      description: "Custom printed to your exact dimensions",
      badge: "Architect Favorite"
    }
  ];

  const handleShopNow = () => {
    router.push('/category/wallpaper/All');
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col lg:flex-row items-center px-6 lg:px-0 py-16 lg:py-0 overflow-hidden">
      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="lg:w-1/2 px-8 lg:px-16 xl:px-24 py-12 lg:py-24 z-10"
      >
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-6 h-6 text-gray-800" />
          <span className="text-sm font-medium text-gray-600">BESPOKE COLLECTION</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
          Tailor-Made Wall Arts
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
          Commission exclusive wall treatments that transform spaces into galleries. Our artisans craft each piece to your exact specifications.
        </p>

        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-4">
            <Ruler className="w-5 h-5 text-gray-700" />
            <p className="text-gray-700">Custom sizing available up to 10m x 3m</p>
          </div>
          <div className="flex items-center gap-4">
            <Palette className="w-5 h-5 text-gray-700" />
            <p className="text-gray-700">500+ material and finish combinations</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShopNow}
          className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Explore Collections
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Wall Art Gallery */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="lg:w-1/2 relative h-full min-h-[600px] lg:min-h-screen p-8 lg:p-12 bg-gray-50"
      >
        <div className="grid grid-cols-2 gap-6 h-full">
          {wallArts.map((art, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="relative h-full group cursor-pointer overflow-hidden"
              onClick={() => router.push(`/product/wall-art-${index+1}`)}
            >
              <Image
                src={art.src}
                alt={art.title}
                fill
                className="object-cover rounded-lg shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg">{art.title}</h3>
                <p className="text-gray-200 text-sm">{art.description}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-900 shadow-sm">
                {art.badge}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative Badge */}
        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-200">
          <p className="text-xs text-gray-600">Featured in</p>
          <p className="font-medium text-gray-900">Architectural Digest</p>
        </div>
      </motion.div>
    </div>
  );
};

export default WallArtShowcase;