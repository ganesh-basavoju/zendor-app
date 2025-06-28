// "use client";

// import AdvancedTechnologySection from "@/components/acoustics/AdvancedTechnologySection";
// import { ApplicationsSection } from "@/components/acoustics/ApplicationsSection";
// import { ClientsSection } from "@/components/acoustics/ClientsSection";
// import ContactFormSection from "@/components/acoustics/ContactFormSection";
// import CustomSolutionsSection from "@/components/acoustics/CustomSolutionsSection";
// import { JourneySection } from "@/components/acoustics/JourneySection";
// import SustainableMaterialsSection from "@/components/acoustics/SustainableMaterialsSection";
// import Image from "next/image";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect } from "react";
// const AcousticsPage = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.3,
//     triggerOnce: false,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   const imageVariants = {
//     hidden: { scale: 1.1 },
//     visible: {
//       scale: 1,
//       transition: {
//         duration: 1.5,
//         ease: [0.2, 0.85, 0.4, 1],
//       },
//     },
//   };

//   const scrollToNextSection = () => {
//     const journeySection = document.getElementById("Applications");
//     if (journeySection) {
//       journeySection.scrollIntoView({ behavior: "smooth" });
//     }
//   };
//   return (
//     <div className=" bg-white">
//       {/* Hero Section */}

//       <motion.section
//         ref={ref}
//         initial="hidden"
//         animate={controls}
//         className="relative md:h-screen sm:h-[480px] h-[400px] -mt-10 md:-mt-20 overflow-hidden"
//       >
//         <motion.div className="absolute inset-0" variants={imageVariants}>
//           <Image
//             src="https://www.muffle.co.uk/cdn/shop/articles/Home_Cinema.jpg?v=1747737541&width=1100"
//             alt="Acoustic Solutions Background"
//             fill
//             className="object-cover opacity-90"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/30"></div>
//         </motion.div>

//         <motion.div
//           className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
//           variants={containerVariants}
//         >
//           <motion.h1
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight"
//             variants={itemVariants}
//           >
//             Elevate Your Space with <br className="hidden sm:block" />
//             Premium Acoustic Solutions
//           </motion.h1>

//           <motion.p
//             className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl px-2 sm:px-0 leading-relaxed"
//             variants={itemVariants}
//           >
//             Discover a curated selection of acoustic panels, sound barriers, and
//             more, designed to enhance any environment.
//           </motion.p>

//           <motion.button
//             onClick={scrollToNextSection}
//             className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md transition duration-300 text-base sm:text-lg font-medium whitespace-nowrap"
//             aria-label="Learn more about acoustic solutions"
//             variants={itemVariants}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Learn More
//           </motion.button>

//           <motion.div
//             className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
//             onClick={scrollToNextSection}
//             variants={itemVariants}
//             animate={{
//               y: [0, 10, 0],
//               transition: {
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               },
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 14l-7 7m0 0l-7-7m7 7V3"
//               />
//             </svg>
//           </motion.div>
//         </motion.div>
//       </motion.section>

//       <JourneySection />
//       <section className="w-full py-12 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* About Section */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-center">
//             <div className="max-w-xl w-full mx-auto lg:mx-0">
//               <h2 className="text-2xl sm:text-3xl font-bold mb-4 p-2 md:p-0 sm:mb-6 text-center lg:text-left">
//                 About Zendor Acoustics
//               </h2>
//               <p className="text-gray-600 text-justify text-base sm:text-lg leading-relaxed sm:leading-loose p-2 lg:text-left">
//                 At Zendor Acoustics, we are passionate about creating
//                 exceptional acoustic environments. With years of expertise, we
//                 offer a comprehensive range of products and solutions tailored
//                 to meet diverse needs. Our commitment to quality, innovation,
//                 and customer satisfaction sets us apart.
//               </p>
//             </div>
//           </div>

//           {/* Testimonials Section */}
//           <div className="w-full lg:w-1/2">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
//               What Our Clients Say
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//               {[
//                 {
//                   name: "Lalith Kumar",
//                   date: "2 months ago",
//                   rating: 5,
//                   comment:
//                     "The team at Zendor transformed our living space with their premium wallpapers. Their attention to detail and professional installation made all the difference.",
//                   image:
//                     "https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_960_720.jpg",
//                 },
//                 {
//                   name: "Priya Sharma",
//                   date: "3 months ago",
//                   rating: 5,
//                   comment:
//                     "The acoustic solutions provided by Zendor have significantly improved our home theater experience. Their expertise in sound management is exceptional.",
//                   image:
//                     "https://images.generated.photos/E_pKlcsQQdq4fvCC4b6uiMZsJg4XjSLzhcGwk0SBFcs/g:no/rs:fill:256:384/czM6Ly9ncGhvdG9z/LXByb2QtaHVtYW4t/Z2FsbGVyeS8yMDUx/L2E3Mjg2ODY3LWNk/ZjktNDE2Mi1hODU1/LTk0OWY4OTZkODA2/ZS0xLmpwZw.jpg",
//                 },
//                 {
//                   name: "Arun Patel",
//                   date: "1 month ago",
//                   rating: 4,
//                   comment:
//                     "The wooden flooring installation was seamless, and the quality is outstanding. Their design suggestions helped us choose the perfect style for our home.",
//                   image:
//                     "https://img.freepik.com/premium-photo/young-bearded-indian-businessman-relaxing-mall-bangkok_251136-53368.jpg?semt=ais_hybrid&w=740",
//                 },
//               ].map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 sm:p-6 rounded-lg shadow-xs hover:shadow-sm transition-shadow duration-200 border border-gray-100"
//                 >
//                   <div className="flex items-center mb-3 sm:mb-4">
//                     <Image
//                       width={40}
//                       height={40}
//                       className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 mr-3 sm:mr-4 object-cover"
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       loading="lazy"
//                     />
//                     <div>
//                       <h3 className="font-medium text-sm sm:text-base">
//                         {testimonial.name}
//                       </h3>
//                       <p className="text-gray-500 text-xs sm:text-sm">
//                         {testimonial.date}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex mb-2 sm:mb-3">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                           i < testimonial.rating
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         aria-hidden="true"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     "{testimonial.comment}"
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       <ApplicationsSection />
//       <section className="py-16 px-2 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Zenith Acoustic Panel */}
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//               <div className="aspect-square relative">
//                 <Image
//                   src="/indoor-bg.png"
//                   alt="Zenith Acoustic Panel"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Zenith Acoustic Panel
//                 </h3>
//                 <p className="text-gray-600">
//                   High-performance panel for superior sound absorption.
//                 </p>
//               </div>
//             </div>

//             {/* Guardian Sound Barrier */}
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//               <div className="aspect-square relative">
//                 <Image
//                   src="/wall.png"
//                   alt="Guardian Sound Barrier"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Guardian Sound Barrier
//                 </h3>
//                 <p className="text-gray-600">
//                   Effective barrier for reducing noise between spaces.
//                 </p>
//               </div>
//             </div>

//             {/* Skyline Ceiling System */}
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//               <div className="aspect-square relative">
//                 <Image
//                   src="/handcraft.png"
//                   alt="Skyline Ceiling System"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Skyline Ceiling System
//                 </h3>
//                 <p className="text-gray-600">
//                   Elegant ceiling system for improved acoustics and aesthetics.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <SustainableMaterialsSection />
//       <AdvancedTechnologySection />
//       <CustomSolutionsSection />
//       <ClientsSection />
//       {/* FAQ Section */}
//       <section className="py-16 px-4 bg-white" id="faq-section">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold mb-8 text-center">
//             Frequently Asked Questions
//           </h2>
//           <div className="space-y-4">
//             <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//               <details className="group">
//                 <summary className="flex justify-between items-center cursor-pointer list-none">
//                   <span className="text-lg font-medium">
//                     What are acoustic panels?
//                   </span>
//                   <span className="transition group-open:rotate-180">
//                     <svg
//                       fill="none"
//                       height="24"
//                       shapeRendering="geometricPrecision"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="1.5"
//                       viewBox="0 0 24 24"
//                       width="24"
//                     >
//                       <path d="M6 9l6 6 6-6"></path>
//                     </svg>
//                   </span>
//                 </summary>
//                 <p className="mt-4 text-gray-600">
//                   Acoustic panels are designed to absorb sound waves, reducing
//                   reverberation and echo within a space. They come in various
//                   materials, sizes, and designs to suit different acoustic and
//                   aesthetic requirements.
//                 </p>
//               </details>
//             </div>

//             <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//               <details className="group">
//                 <summary className="flex justify-between items-center cursor-pointer list-none">
//                   <span className="text-lg font-medium">
//                     How do sound barriers work?
//                   </span>
//                   <span className="transition group-open:rotate-180">
//                     <svg
//                       fill="none"
//                       height="24"
//                       shapeRendering="geometricPrecision"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="1.5"
//                       viewBox="0 0 24 24"
//                       width="24"
//                     >
//                       <path d="M6 9l6 6 6-6"></path>
//                     </svg>
//                   </span>
//                 </summary>
//                 <p className="mt-4 text-gray-600">
//                   Sound barriers work by blocking and absorbing sound waves,
//                   preventing them from traveling between spaces. They're
//                   particularly effective for reducing noise transmission through
//                   walls, floors, and ceilings.
//                 </p>
//               </details>
//             </div>

//             <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//               <details className="group">
//                 <summary className="flex justify-between items-center cursor-pointer list-none">
//                   <span className="text-lg font-medium">
//                     Can I install these products myself?
//                   </span>
//                   <span className="transition group-open:rotate-180">
//                     <svg
//                       fill="none"
//                       height="24"
//                       shapeRendering="geometricPrecision"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="1.5"
//                       viewBox="0 0 24 24"
//                       width="24"
//                     >
//                       <path d="M6 9l6 6 6-6"></path>
//                     </svg>
//                   </span>
//                 </summary>
//                 <p className="mt-4 text-gray-600">
//                   While some of our products are DIY-friendly, we recommend
//                   professional installation for optimal acoustic performance.
//                   Our team can provide expert installation services to ensure
//                   proper placement and maximum effectiveness.
//                 </p>
//               </details>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ContactFormSection />
//     </div>
//   );
// };

// export default AcousticsPage;

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
import { FiAward, FiCheckCircle, FiHeadphones, FiShield } from "react-icons/fi";

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
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        className="relative md:h-screen sm:h-[480px] h-[400px] -mt-10 md:-mt-20 overflow-hidden"
      >
        <motion.div className="absolute inset-0" variants={imageVariants}>
          <Image
            src="https://i.pinimg.com/736x/00/79/f9/0079f9f65bee17e9d6530ab8ebb5954b.jpg"
            alt="Premium Acoustic Solutions for Business Excellence"
            fill
            className="object-cover opacity-90"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
        </motion.div>

        <motion.div
          className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              Industry-Leading Acoustic Solutions
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
              Transform Your Space with
            </span>
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
              Professional Acoustic Excellence
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-4xl px-2 sm:px-0 leading-relaxed font-light"
            variants={itemVariants}
          >
            Engineered solutions for corporate offices, hospitality venues, and
            high-end residential projects. Experience unparalleled sound quality
            with our premium acoustic systems.
          </motion.p>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <motion.button
              onClick={scrollToNextSection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition duration-300 text-lg font-medium whitespace-nowrap flex items-center gap-2"
              aria-label="Explore our acoustic solutions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Solutions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-lg transition duration-300 text-lg font-medium whitespace-nowrap border-2 border-white/30"
              aria-label="Contact our experts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consult Our Experts
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToNextSection}
            variants={itemVariants}
            animate={{
              y: [0, 10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FiAward className="h-8 w-8" />,
                title: "Industry Certified",
                description: "Award-winning solutions",
              },
              {
                icon: <FiCheckCircle className="h-8 w-8" />,
                title: "500+ Projects",
                description: "Successful implementations",
              },
              {
                icon: <FiHeadphones className="h-8 w-8" />,
                title: "Premium Support",
                description: "Dedicated account managers",
              },
              {
                icon: <FiShield className="h-8 w-8" />,
                title: "10-Year Warranty",
                description: "On select products",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <JourneySection />

      {/* About & Testimonials Section */}
      <section className="w-full py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* About Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="max-w-xl w-full mx-auto lg:mx-0">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                About Our Company
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                Crafting Acoustic Excellence Since 2010
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Zendor Acoustics, we combine cutting-edge technology with
                artisanal craftsmanship to deliver unparalleled acoustic
                solutions for discerning clients. Our team of acoustic engineers
                and design specialists work collaboratively to create
                environments where sound quality meets aesthetic perfection.
              </p>
              <div className="space-y-4">
                {[
                  "ISO 9001 Certified Manufacturing",
                  "LEED Compliant Sustainable Materials",
                  "Bespoke Design Consultations",
                  "Global Supply Chain Partnerships",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Trusted by Industry Leaders
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Lalith Kumar",
                    position: "CTO, TechNova Solutions",
                    rating: 5,
                    comment:
                      "Zendor's acoustic panels transformed our open-plan office. The noise reduction has significantly improved productivity and employee satisfaction. Their team delivered exceptional service from consultation through installation.",
                    image:
                      "https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_960_720.jpg",
                  },
                  {
                    name: "Priya Sharma",
                    position: "Director, Urban Hospitality Group",
                    rating: 5,
                    comment:
                      "We've used Zendor's solutions across five luxury hotels. Their ability to balance acoustic performance with design aesthetics is unmatched. The custom fabric-wrapped panels became a signature design element in our properties.",
                    image:
                      "https://images.generated.photos/E_pKlcsQQdq4fvCC4b6uiMZsJg4XjSLzhcGwk0SBFcs/rs:fill:256:384/czM6Ly9ncGhvdG9z/LXByb2QtaHVtYW4t/Z2FsbGVyeS8yMDUx/L2E3Mjg2ODY3LWNk/ZjktNDE2Mi1hODU1/LTk0OWY4OTZkODA2/ZS0xLmpwZw.jpg",
                  },
                  {
                    name: "Arun Patel",
                    position: "Acoustic Consultant, SoundSpace Design",
                    rating: 4,
                    comment:
                      "As an acoustic consultant, I specify Zendor products regularly. Their NRC ratings are accurate and their technical support team is knowledgeable. I particularly appreciate their transparency with test data.",
                    image:
                      "https://img.freepik.com/premium-photo/young-bearded-indian-businessman-relaxing-mall-bangkok_251136-53368.jpg",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-xs hover:shadow-sm transition-all duration-300 border border-gray-100"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start">
                      <Image
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full bg-gray-100 mr-4 object-cover flex-shrink-0"
                        src={testimonial.image}
                        alt={testimonial.name}
                        loading="lazy"
                      />
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h3>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">
                            {testimonial.position}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600">"{testimonial.comment}"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApplicationsSection />

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              Our Signature Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Engineered for Performance & Aesthetics
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Premium acoustic solutions designed for corporate, hospitality,
              and high-end residential applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Zenith Acoustic Panel */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -10 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/indoor-bg.png"
                  alt="Zenith Acoustic Panel"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">
                    Best Seller
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Zenith Acoustic Panel
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 mb-2">NRC 0.95 • 24dB STC</p>
                    <p className="text-gray-900 font-medium">
                      High-performance sound absorption for critical
                      environments
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View Specifications
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Request Samples
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Guardian Sound Barrier */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -10 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/wall.png"
                  alt="Guardian Sound Barrier"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full mb-2">
                    Green Certified
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Guardian Sound Barrier
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 mb-2">
                      STC 52 • 100% Recyclable
                    </p>
                    <p className="text-gray-900 font-medium">
                      High-density composite panels for superior noise isolation
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View Specifications
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Request Samples
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Skyline Ceiling System */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -10 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/handcraft.png"
                  alt="Skyline Ceiling System"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full mb-2">
                    Architectural Choice
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Skyline Ceiling System
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 mb-2">
                      NRC 0.85 • Custom Configurations
                    </p>
                    <p className="text-gray-900 font-medium">
                      Modular acoustic ceilings with seamless integration
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View Specifications
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Request Samples
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white hover:bg-gray-50 text-blue-600 rounded-lg border border-blue-600 text-lg font-medium transition-colors shadow-sm hover:shadow-md">
              View Full Product Catalog
            </button>
          </div>
        </div>
      </section>

      <SustainableMaterialsSection />
      <AdvancedTechnologySection />
      <CustomSolutionsSection />
      <ClientsSection />

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white" id="faq-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              Knowledge Center
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Professional insights for your acoustic project planning
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question:
                  "What are the key considerations for corporate office acoustics?",
                answer:
                  "Corporate environments require balancing speech privacy with collaboration. We recommend a combination of sound-absorbing ceiling clouds, partition systems with appropriate STC ratings, and strategic placement of freestanding acoustic screens. Our team conducts detailed noise mapping to optimize placement.",
              },
              {
                question:
                  "How do your solutions integrate with smart building systems?",
                answer:
                  "Our premium acoustic panels can incorporate IoT sensors for environmental monitoring, and our ceiling systems are designed for seamless integration with lighting and HVAC systems. We work closely with your smart building consultants to ensure compatibility.",
              },
              {
                question: "What certifications do your products carry?",
                answer:
                  "Our products meet or exceed international standards including ISO 354 (sound absorption), ASTM E90 (sound transmission), and are GREENGUARD Gold certified for indoor air quality. Full documentation is available for LEED and WELL building projects.",
              },
              {
                question:
                  "Can you provide custom colors and branding for corporate identity?",
                answer:
                  "Absolutely. Our design studio offers unlimited Pantone color matching, custom digital printing for logos or artwork, and even textured finishes. We've created signature acoustic solutions for Fortune 500 companies and luxury brands worldwide.",
              },
              {
                question:
                  "What's your lead time for large commercial projects?",
                answer:
                  "Standard products ship within 2-3 weeks. Custom solutions typically require 4-6 weeks for production. For urgent projects, we offer expedited manufacturing with a 25% surcharge. Our project managers will create a detailed timeline during the consultation phase.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="border rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                    <span className="text-lg font-medium text-gray-900">
                      {item.question}
                    </span>
                    <span className="text-blue-600 transition-transform duration-300 group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600">
                    {item.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Have more specific technical questions?
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Speak with an Acoustic Specialist
            </button>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </div>
  );
};

export default AcousticsPage;
