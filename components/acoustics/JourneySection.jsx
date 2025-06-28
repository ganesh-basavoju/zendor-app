"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const journeySteps = [
  {
    step: "01",
    title: "Design Consultation",
    description: [
      "Initial discovery session with our acoustic specialists",
      "3D modeling and acoustic simulation",
      "Material selection from premium catalog",
      "Concept approval and design sign-off",
    ],
    image: "https://i.ibb.co/Nnyc0fSf/image-22-3.jpg",
    icon: (
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
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Fabrication",
    description: [
      "Precision manufacturing in our ISO-certified facility",
      "Quality control at every production stage",
      "Custom finishing and detailing",
      "White-glove packaging for transport",
    ],
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
    icon: (
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
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Installation",
    description: [
      "Certified installation team deployment",
      "Pre-installation site preparation",
      "Precision fitting and calibration",
      "Post-installation acoustic testing",
    ],
    image: "https://i.ibb.co/YFYMWg0s/image-17-3.jpg",
    icon: (
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export const JourneySection = () => {
  return (
    <section id="journey" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-full mb-4 shadow-sm">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The <span className="text-blue-600">Zendor</span> Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless journey from concept to completion, tailored for
            discerning clients
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -z-10"></div>
          <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 -z-10 transform -translate-x-1/2"></div>

          {/* Steps container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Step indicator */}
                <div className="absolute md:top-1/2 top-0 left-1/2 md:left-0 transform -translate-x-1/2 md:-translate-y-1/2 -translate-y-1/2 z-20">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-blue-500">
                    <div className="text-blue-600">{step.icon}</div>
                  </div>
                </div>

                {/* Step content */}
                <div className="pt-12 md:pt-0 md:pl-20 text-center md:text-left">
                  {/* Step header */}
                  <div className="mb-6">
                    <span className="text-sm font-medium text-blue-600">
                      {step.step}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <ul className="space-y-3">
                      {step.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-flex items-center">
            Begin Your Project Journey
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
