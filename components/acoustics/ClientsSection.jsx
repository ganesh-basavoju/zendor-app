"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const clientLogos = [
  {
    name: "ZZ Architects",
    image: "https://i.ibb.co/8DgMtbJ6/image-27-3.png",
    category: "Architecture",
    project: "Mumbai Corporate Tower"
  },
  {
    name: "Sanjay Puri Architects",
    image: "https://i.ibb.co/FkYL7Bjv/image-27-7.jpg",
    category: "Architecture",
    project: "Bangalore Tech Campus"
  },
  {
    name: "Radisson Hotels & Resorts",
    image: "https://i.ibb.co/N6wvhXrx/image.png",
    category: "Hospitality",
    project: "Delhi Luxury Hotel"
  },
  {
    name: "JW Marriott",
    image: "https://i.ibb.co/Gvthxbbn/image-27-5.png",
    category: "Hospitality",
    project: "Goa Beach Resort"
  },
  {
    name: "Guri Khan Designs",
    image: "https://i.ibb.co/6J0gGnXL/image-27-8.jpg",
    category: "Design",
    project: "Mumbai Penthouse"
  },
  {
    name: "Pyrinox Pictures",
    image: "https://i.ibb.co/LdKzrxJw/image-27-6.jpg",
    category: "Entertainment",
    project: "Bollywood Studio Complex"
  }
];

export const ClientsSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mb-6">
            Trusted By Industry Leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Our <span className="text-blue-600">Prestigious</span> Collaborations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partnering with the world's most discerning architects, designers, and brands to create exceptional acoustic environments
          </p>
        </motion.div>

        {/* Client logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative w-full aspect-[3/2] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex items-center justify-center">
                <div className="absolute inset-0 border border-gray-100 rounded-xl pointer-events-none"></div>
                <Image
                  src={client.image}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="object-contain max-h-20 md:max-h-24 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Client info overlay */}
              <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-medium text-gray-900">{client.name}</h3>
                <div className="flex items-center justify-center mt-1">
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    client.category === "Architecture" ? "bg-blue-100 text-blue-800" :
                    client.category === "Hospitality" ? "bg-green-100 text-green-800" :
                    client.category === "Design" ? "bg-purple-100 text-purple-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {client.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{client.project}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 bg-gray-50 rounded-2xl p-8 md:p-12 shadow-inner"
        >
          <div className="max-w-4xl mx-auto text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
              "Zendor's acoustic solutions have become our standard specification for high-end projects. Their ability to combine technical performance with aesthetic excellence is unmatched in the industry."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Client testimonial"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">Rahul Mehta</p>
                <p className="text-gray-600">Principal Architect, ZZ Architects</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-flex items-center">
            Become Our Next Success Story
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};