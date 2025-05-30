"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Designer Wallpapers",
    description: "Stylish and timeless wallpaper designs to elevate any space",
    image: "https://2.wlimg.com/product_images/bc-full/2023/2/11673283/designer-wallpaper-1675669074-6749474.jpeg",
    link:"/category/wallpaper/All"
  },
  {
    name: "Wooden Floorings",
    description: "Premium quality wooden floors that blend durability with elegance",
    image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
     link:"/category/wooden flooring/All"
  },
  {
    name: "Acoustic Panels",
    description: "Modern soundproofing solutions for homes, studios, and offices",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    link:"/category/acoustics"
  },
  // {
  //   name: "Decorative Wall Elements",
  //   description: "Eye-catching designs and finishes that bring walls to life",
  //   image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
  // },
];


const CategorySection = () => {
  const router = useRouter();

  const handleCategoryClick = (link) => {
    router.push(link);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Discover our curated collection of premium home decor essentials
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 place-items-center place-content-center max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group cursor-pointer w-full max-w-[320px] sm:max-w-sm mx-auto flex flex-col items-center"
              onClick={() => handleCategoryClick(category.link)}
            >
              <div className="relative mb-4 sm:mb-6 w-full">
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              </div>
              <div className="text-center w-full px-2 sm:px-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {category.description}
                </p>
                <div className="w-10 sm:w-12 h-[2px] bg-gray-400 mx-auto transform transition-all duration-300 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
