"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Tailored Aesthetics",
    description: "Custom designs for walls, floors & acoustics"
  },
  {
    title: "Global Quality",
    description: "Premium finishes, sourced from the finest manufacturers"
  },
  {
    title: "Precision Installation",
    description: "Executed by skilled professionals for a flawless finish"
  }
];

export default function Handcrafted() {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <section className="relative py-20">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg"
          alt="Interior design background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Crafted for Living,
            <span className="block text-gray-300">Designed for You</span>
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Whether it’s luxurious wallpapers, sophisticated wooden floorings, or modern acoustic solutions — each piece is crafted with purpose, passion, and precision to elevate your interiors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/custom-design")}
              className="px-8 cursor-pointer py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Custom Project
            </button>
            <button
              onClick={() => navigate("/visit-store")}
              className="px-8 cursor-pointer py-4 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
