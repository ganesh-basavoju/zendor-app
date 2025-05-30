"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const journeySteps = [
  {
    step: "Step 1",
    title: "Design & Planning",
    description: [
      "Discuss your ideas.",
      "Plan the design.",
      "Choose colors & materials. Visual Brainstorming session or mood board.",
    ],
    image: "https://i.ibb.co/Nnyc0fSf/image-22-3.jpg",
  },
  {
    step: "Step 2",
    title: "Production",
    description: [
      "Approve a sample.",
      "Gather materials. Visual Sample materials,",
      "sketches, or a workshop setting.",
    ],
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
  },
  {
    step: "Step 3",
    title: "Implementation",
    description: [
      "Implementation",
      "Installation",
      "Post-Installation Support",
    ],
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
  },
];

export const JourneySection = () => {
  return (
    <section
      id="journey"
      className="py-12 md:py-20 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-r from-gray-50 to-gray-100 bg-[url('/patterns/grid.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Your Journey with Zendor
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-gray-900 to-gray-700 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line for mobile, horizontal for desktop */}
          <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-gray-900 to-gray-200"></div>
          <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-gray-200 via-gray-900 to-gray-200 transform -translate-x-1/2"></div>

          {/* Steps container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                {/* Step dot with responsive positioning */}
                <div className="absolute md:-top-4 top-0 left-1/2 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Step content */}
                <div className="pt-8 md:pt-16 text-center">
                  {/* Step header */}
                  <div className="inline-block px-4 py-2 md:px-6 md:py-2 bg-gray-900 text-white rounded-full text-sm md:text-base">
                    <span className="font-medium">
                      {step.step}: {step.title}
                    </span>
                  </div>

                  {/* Always visible description on mobile, hover on desktop */}
                  <div className="md:opacity-0 md:group-hover:opacity-100 md:transform md:group-hover:-translate-y-2 transition-all duration-300 mt-4 md:mt-6">
                    <ul className="text-left space-y-2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm md:shadow-lg">
                      {step.description.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-900 rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
                          <span className="text-xs md:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
