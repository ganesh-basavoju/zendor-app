"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";

const bestsellers = [
  {
    title: "Diner",
    description:
      "Think candy-striped lines reminiscent of vintage barstools, geometric tiles that echo checkerboard floors, and curves that mirror the swoop of a jukebox or the arch of a classic diner sign. With a palette of soft pastels, bold reds, and glowing blues, this collection blends nostalgia with bold graphic energy.",
    price: "₹11,499",
    image: "https://i.ibb.co/JwyhCMPB/160995.webp",
    category: "Designer Wallpapers",
    link: "/products/wallpapers/681f836c6c927adca973affe",
  },
  {
    title: "Walnut Atlanta",
    description:
      "Walnut Atlanta Laminate Flooring features rich, dark walnut tones with intricate grain patterns that bring a touch of luxury and sophistication to any space. Its deep, warm hues create a cozy, elegant ambiance, making it perfect for both modern and traditional interiors.",
    price: "₹18,499",
    image:
      "https://www.bohomaterials.com/web/image/product.product/350/image_1024/Walnut%20Atlanta%20(Residence)?unique=5d1ea86",
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#4D4D4D] mb-6">
            Our Bestsellers
          </h2>
          <p className="text-lg text-[#4D4D4D]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our most loved collections that transform spaces into works
            of art
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {bestsellers.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-100"
              onClick={() => handleProductClick(item.link)}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />

                {/* Overlay - visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4D4D4D]/90 via-[#4D4D4D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                    <span className="text-white/90 text-xs font-medium tracking-wider uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-white text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs font-light line-clamp-2">
                      {item.description}
                    </p>
                    <button
                      className="mt-3 px-4 py-2 bg-white text-[#4D4D4D] rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors border border-gray-200"
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

              {/* Bottom info section */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[#4D4D4D]/60 text-xs font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-[#4D4D4D] text-base font-semibold mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[#4D4D4D] font-medium">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}