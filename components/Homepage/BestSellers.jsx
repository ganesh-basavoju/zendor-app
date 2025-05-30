"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
const bestsellers = [
  {
    title: "Diner",
    description:
      "Think candy-striped lines reminiscent of vintage barstools, geometric tiles that echo checkerboard floors, and curves that mirror the swoop of a jukebox or the arch of a classic diner sign. With a palette of soft pastels, bold reds, and glowing blues, this collection blends nostalgia with bold graphic energy. ",
    price: "₹11,499",
    image: "https://i.ibb.co/JwyhCMPB/160995.webp", // You can replace this with your own wallpaper image
    category: "Designer Wallpapers",
    link: "/products/wallpapers/681f836c6c927adca973affe",
  },
  {
    title: "Walnut Atlanta",
    description:
      "Walnut Atlanta Laminate Flooring features rich, dark walnut tones with intricate grain patterns that bring a touch of luxury and sophistication to any space. Its deep, warm hues create a cozy, elegant ambiance, making it perfect for both modern and traditional interiors.",
    price: "₹18,499",
    image:
      "https://www.bohomaterials.com/web/image/product.product/350/image_1024/Walnut%20Atlanta%20(Residence)?unique=5d1ea86", // You can replace this with your own wooden flooring image
    category: "Wooden Floorings",
    link: "products/wooden-flooring/680dbf3635c9b2fb410a4821",
  },
  {
    title: "Studio Acoustic Panel",
    description:
      "Sleek and sound-absorbing, our Studio Acoustic Panels provide both visual appeal and optimal sound control. Ideal for home theaters, studios, or modern interiors.",
    price: "₹13,999",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e16fc7626484743f587f498/1698241915720-H34VC2PXC2MJ23CW2IPD/20.jpeg?format=2500w",
    category: "Acoustic Solutions",
    link: "/category/acoustics",
  },
];

export default function Bestsellers() {
  const router = useRouter();

  const handleProductClick = (link) => {
    router.push(link);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
            Our Bestsellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our most loved collections that transform spaces into works
            of art
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* {bestsellers.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleProductClick(index)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={700}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white/90 text-xs md:text-sm font-medium tracking-wide uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-xs md:text-base mt-1 md:mt-3 line-clamp-2 md:line-clamp-3 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 md:mt-6">
                      <button
                        className="px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-100 transition-colors tracking-wide"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(item.link);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
          {bestsellers.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              onClick={() => handleProductClick(index)}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay - visible on mobile, hover on desktop */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                      opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 space-y-1 md:space-y-2">
                    <span className="text-white/90 text-xs md:text-sm font-semibold tracking-wide block">
                      {item.category}
                    </span>
                    <h3 className="text-white text-sm md:text-base font-semibold line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text line-clamp-2-xs md:text-sm font-light line-clamp-2">
                      {item.description}
                    </p>
                    <button
                      className="mt-2 md:mt-3 px-4 py-2 bg-white text-gray-900 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(item.link);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Always visible info on mobile */}
              <div className="p-3 md:hidden">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="text-gray-900 text-sm font-semibold mt-1 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
