"use client";

import AdvancedTechnologySection from "@/components/acoustics/AdvancedTechnologySection";
import { ApplicationsSection } from "@/components/acoustics/ApplicationsSection";
import { ClientsSection } from "@/components/acoustics/ClientsSection";
import ContactFormSection from "@/components/acoustics/ContactFormSection";
import CustomSolutionsSection from "@/components/acoustics/CustomSolutionsSection";
import { JourneySection } from "@/components/acoustics/JourneySection";
import SustainableMaterialsSection from "@/components/acoustics/SustainableMaterialsSection";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
const AcousticsPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.2, 0.85, 0.4, 1],
      },
    },
  };

  const scrollToNextSection = () => {
    const journeySection = document.getElementById("Applications");
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className=" bg-white">
      {/* Hero Section */}

      <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="relative md:h-screen sm:h-[480px] h-[400px] -mt-10 md:-mt-20 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0"
        variants={imageVariants}
      >
        <Image
          src="https://www.muffle.co.uk/cdn/shop/articles/Home_Cinema.jpg?v=1747737541&width=1100"
          alt="Acoustic Solutions Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      <motion.div 
        className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight"
          variants={itemVariants}
        >
          Elevate Your Space with <br className="hidden sm:block" />
          Premium Acoustic Solutions
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl px-2 sm:px-0 leading-relaxed"
          variants={itemVariants}
        >
          Discover a curated selection of acoustic panels, sound barriers, and
          more, designed to enhance any environment.
        </motion.p>

        <motion.button
          onClick={scrollToNextSection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md transition duration-300 text-base sm:text-lg font-medium whitespace-nowrap"
          aria-label="Learn more about acoustic solutions"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>

        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNextSection}
          variants={itemVariants}
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>

      <JourneySection />
      <section className="w-full py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* About Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="max-w-xl w-full mx-auto lg:mx-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 p-2 md:p-0 sm:mb-6 text-center lg:text-left">
                About Zendor Acoustics
              </h2>
              <p className="text-gray-600 text-justify text-base sm:text-lg leading-relaxed sm:leading-loose p-2 lg:text-left">
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  name: "Lalith Kumar",
                  date: "2 months ago",
                  rating: 5,
                  comment:
                    "The team at Zendor transformed our living space with their premium wallpapers. Their attention to detail and professional installation made all the difference.",
                  image:
                    "https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_960_720.jpg",
                },
                {
                  name: "Priya Sharma",
                  date: "3 months ago",
                  rating: 5,
                  comment:
                    "The acoustic solutions provided by Zendor have significantly improved our home theater experience. Their expertise in sound management is exceptional.",
                  image:
                    "https://images.generated.photos/E_pKlcsQQdq4fvCC4b6uiMZsJg4XjSLzhcGwk0SBFcs/g:no/rs:fill:256:384/czM6Ly9ncGhvdG9z/LXByb2QtaHVtYW4t/Z2FsbGVyeS8yMDUx/L2E3Mjg2ODY3LWNk/ZjktNDE2Mi1hODU1/LTk0OWY4OTZkODA2/ZS0xLmpwZw.jpg",
                },
                {
                  name: "Arun Patel",
                  date: "1 month ago",
                  rating: 4,
                  comment:
                    "The wooden flooring installation was seamless, and the quality is outstanding. Their design suggestions helped us choose the perfect style for our home.",
                  image:
                    "https://img.freepik.com/premium-photo/young-bearded-indian-businessman-relaxing-mall-bangkok_251136-53368.jpg?semt=ais_hybrid&w=740",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-xs hover:shadow-sm transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Image
                      width={40}
                      height={40}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 mr-3 sm:mr-4 object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))}
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
