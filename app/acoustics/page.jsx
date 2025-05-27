"use client";

import AdvancedTechnologySection from "@/components/acoustics/AdvancedTechnologySection";
import { ApplicationsSection } from "@/components/acoustics/ApplicationsSection";
import { ClientsSection } from "@/components/acoustics/ClientsSection";
import ContactFormSection from "@/components/acoustics/ContactFormSection";
import CustomSolutionsSection from "@/components/acoustics/CustomSolutionsSection";
import { JourneySection } from "@/components/acoustics/JourneySection";
import SustainableMaterialsSection from "@/components/acoustics/SustainableMaterialsSection";
import Image from "next/image";
import Link from "next/link";

const AcousticsPage = () => {
  const scrollToNextSection = () => {
    const journeySection = document.getElementById("Applications");
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[540px]  overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://www.muffle.co.uk/cdn/shop/articles/Home_Cinema.jpg?v=1747737541&width=1100"
            alt="Acoustic Solutions Background"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Elevate Your Space with Premium Acoustic Solutions
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">
            Discover a curated selection of acoustic panels, sound barriers, and
            more, designed to enhance any environment.
          </p>
          {/* <Link
            href="/products?category=acoustics"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-medium"
          >
            Explore Products
          </Link> */}
          <button
            onClick={scrollToNextSection}
            className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-medium"
          >
            Learn More
          </button>
        </div>
      </section>
      <JourneySection />
      <section className="w-full py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* About Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
            <div className="max-w-xl w-full">
              <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">
                About Zendor Acoustics
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed text-center lg:text-left">
                At Zendor Acoustics, we are passionate about creating
                exceptional acoustic environments. With years of expertise, we
                offer a comprehensive range of products and solutions tailored
                to meet diverse needs. Our commitment to quality, innovation,
                and customer satisfaction sets us apart.
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {/* First Testimonial */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full bg-gray-200 mr-4 object-cover"
                    src="https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_960_720.jpg"
                    alt="client_pic"
                  />
                  <div>
                    <h3 className="font-medium">Lalith Kumar</h3>
                    <p className="text-gray-500 text-sm">2 months ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">
                  "The team at Zendor transformed our living space with their
                  premium wallpapers. Their attention to detail and professional
                  installation made all the difference."
                </p>
              </div>

              {/* Second Testimonial */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full bg-gray-200 mr-4 object-cover"
                    src="https://images.generated.photos/E_pKlcsQQdq4fvCC4b6uiMZsJg4XjSLzhcGwk0SBFcs/g:no/rs:fill:256:384/czM6Ly9ncGhvdG9z/LXByb2QtaHVtYW4t/Z2FsbGVyeS8yMDUx/L2E3Mjg2ODY3LWNk/ZjktNDE2Mi1hODU1/LTk0OWY4OTZkODA2/ZS0xLmpwZw.jpg"
                    alt="client_pic"
                  />
                  <div>
                    <h3 className="font-medium">Priya Sharma</h3>
                    <p className="text-gray-500 text-sm">3 months ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">
                  "The acoustic solutions provided by Zendor have significantly
                  improved our home theater experience. Their expertise in sound
                  management is exceptional."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full bg-gray-200 mr-4 object-cover"
                    src="https://img.freepik.com/premium-photo/young-bearded-indian-businessman-relaxing-mall-bangkok_251136-53368.jpg?semt=ais_hybrid&w=740"
                    alt="client_pic"
                  />

                  <div>
                    <h3 className="font-medium">Arun Patel</h3>
                    <p className="text-gray-500 text-sm">1 month ago</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">
                  "The wooden flooring installation was seamless, and the
                  quality is outstanding. Their design suggestions helped us
                  choose the perfect style for our home."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ApplicationsSection />
      <section className="py-16 px-2 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Zenith Acoustic Panel */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <Image
                  src="/indoor-bg.png"
                  alt="Zenith Acoustic Panel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Zenith Acoustic Panel
                </h3>
                <p className="text-gray-600">
                  High-performance panel for superior sound absorption.
                </p>
              </div>
            </div>

            {/* Guardian Sound Barrier */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <Image
                  src="/wall.png"
                  alt="Guardian Sound Barrier"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Guardian Sound Barrier
                </h3>
                <p className="text-gray-600">
                  Effective barrier for reducing noise between spaces.
                </p>
              </div>
            </div>

            {/* Skyline Ceiling System */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <Image
                  src="/handcraft.png"
                  alt="Skyline Ceiling System"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Skyline Ceiling System
                </h3>
                <p className="text-gray-600">
                  Elegant ceiling system for improved acoustics and aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SustainableMaterialsSection />
      <AdvancedTechnologySection />
      <CustomSolutionsSection />
      <ClientsSection />
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white" id="faq-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">
                    What are acoustic panels?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Acoustic panels are designed to absorb sound waves, reducing
                  reverberation and echo within a space. They come in various
                  materials, sizes, and designs to suit different acoustic and
                  aesthetic requirements.
                </p>
              </details>
            </div>

            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">
                    How do sound barriers work?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Sound barriers work by blocking and absorbing sound waves,
                  preventing them from traveling between spaces. They're
                  particularly effective for reducing noise transmission through
                  walls, floors, and ceilings.
                </p>
              </details>
            </div>

            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">
                    Can I install these products myself?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  While some of our products are DIY-friendly, we recommend
                  professional installation for optimal acoustic performance.
                  Our team can provide expert installation services to ensure
                  proper placement and maximum effectiveness.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </div>
  );
};

export default AcousticsPage;
