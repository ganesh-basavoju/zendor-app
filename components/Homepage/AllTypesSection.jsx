"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { useRouter } from "next/navigation";

// const categories = [
//   {
//     name: 'Wooden Wall Panels',
//     description: 'Premium wooden wall coverings',
//     img: 'https://images.pexels.com/photos/6958526/pexels-photo-6958526.jpeg'
//   },
//   {
//     name: 'Engineered Flooring',
//     description: 'Durable and stylish flooring solutions',
//     img: 'https://images.pexels.com/photos/6207757/pexels-photo-6207757.jpeg'
//   },
//   {
//     name: 'Luxury Carpets',
//     description: 'Hand-knotted artisan carpets',
//     img: 'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg'
//   },
//   {
//     name: 'Designer Acoustics',
//     description: 'Sound-absorbing wall solutions',
//     img: 'https://images.pexels.com/photos/6585602/pexels-photo-6585602.jpeg'
//   },
//   {
//     name: 'Premium Fabrics',
//     description: 'Curated textile collections',
//     img: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg'
//   },
//   {
//     name: 'Luxury Curtains',
//     description: 'Bespoke window treatments',
//     img: 'https://images.pexels.com/photos/6585602/pexels-photo-6585602.jpeg'
//   }
// ];
const categories = [
  {
    name: "Designer Wallpapers",
    description: "Artistic wall coverings for modern, luxury spaces",
    link: "/category/wallpaper/All",
    img: "https://cdn11.bigcommerce.com/s-5gk3908h6p/images/stencil/original/image-manager/w0183-01-room-.jpg", // Elegant wallpaper design
  },
  {
    name: "Acoustic Wall Panels",
    description: "Stylish sound-absorbing panels that elevate any room",
    link: "/category/wooden flooring/All",
    img: "https://carltonbale.com/wp-content/uploads/2014/04/home_theater_acoustic_room_design.jpg",
  },
  {
    name: "Engineered Wooden Flooring",
    description: "Durable, elegant wood floors crafted for timeless interiors",
    link: "/category/acoustics",
    img: "https://media.houseandgarden.co.uk/photos/61893bbea4c7bfe01adfefe2/1:1/w_1666,h_1666,c_limit/hallway_117.jpg", // Premium wood flooring
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
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated categories of premium home décor
            solutions
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-full"
          columnClassName="pl-4 bg-clip-padding"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="mb-6 cursor-pointer group"
              onClick={() => handleCategoryClick(category.link)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={category.img}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2 sm:line-clamp-none">
                      {category.description}
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-white/90 text-gray-900 rounded-lg text-sm font-medium hover:bg-white transition-colors duration-200 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.link);
                      }}
                    >
                      Explore Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default AllTypesSection;
