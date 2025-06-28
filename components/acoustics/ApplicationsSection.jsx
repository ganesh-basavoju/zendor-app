import Image from "next/image";
import { motion } from "framer-motion";

const applications = [
  {
    title: "Executive Home Theaters",
    description: "Premium acoustic solutions for immersive entertainment experiences with THX-certified performance",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1",
    category: "Residential"
  },
  {
    title: "Corporate Office Spaces",
    description: "Professional sound management solutions for Fortune 500 companies and tech campuses",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1",
    category: "Commercial"
  },
  {
    title: "Luxury Estates",
    description: "Bespoke acoustic treatments that complement architectural masterpieces",
    image: "https://wsdg.com/wp-content/uploads/news_hiddenwires.jpg",
    category: "Residential"
  },
  {
    title: "Premium Retail Spaces",
    description: "Ambient noise control systems for high-end shopping destinations",
    image: "https://archello.s3.eu-central-1.amazonaws.com/images/2020/05/19/Gustafs-Acoustic-Wood-Panels-4.1589871178.9004.jpg",
    category: "Commercial"
  },
  {
    title: "Performance Venues",
    description: "Acoustic engineering for world-class concert halls and theaters",
    image: "https://i.redd.it/34mcot6e63mb1.jpg",
    category: "Institutional"
  },
  {
    title: "Private Screening Rooms",
    description: "Custom-designed acoustic solutions for elite entertainment spaces",
    image: "https://www.auralexchange.com/wp-content/uploads/2017/11/hometheater5.jpg",
    category: "Residential"
  },
  {
    title: "Boardrooms & Conference Centers",
    description: "Sound-dampening systems with integrated technology for global corporations",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1",
    category: "Commercial"
  },
  {
    title: "Five-Star Hospitality",
    description: "Acoustic perfection for luxury hotels and resorts",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1",
    category: "Hospitality"
  }
];

export const ApplicationsSection = () => {
  return (
    <section id="Applications" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mb-4">
            Industry Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tailored Acoustic Applications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Engineered solutions for the world's most demanding acoustic environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, index) => (
            <motion.div 
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={100}
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    app.category === "Residential" ? "bg-blue-100 text-blue-800" :
                    app.category === "Commercial" ? "bg-green-100 text-green-800" :
                    app.category === "Hospitality" ? "bg-purple-100 text-purple-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {app.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {app.title}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {app.description}
                  </p>
                  <button className="mt-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center">
                    View Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Custom Application Consultation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};