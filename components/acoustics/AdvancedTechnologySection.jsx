import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AdvancedTechnologySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            Cutting-Edge Innovation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Next-Generation Acoustic Technologies
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Proprietary systems developed for the most demanding commercial and institutional applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              {
                title: '3D Volumetric Sound Diffusion',
                description: 'Our patented QRD (Quadratic Residue Diffuser) technology creates perfectly balanced sound fields for critical listening environments. Ideal for concert halls, recording studios, and high-end home theaters.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                reference: '5'
              },
              {
                title: 'Adaptive Noise Cancellation',
                description: 'AI-powered active noise control systems that analyze and neutralize unwanted frequencies in real-time. Perfect for open-plan offices, healthcare facilities, and transportation hubs.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                  </svg>
                ),
                reference: '6'
              },
              {
                title: 'Acoustic Metamaterials',
                description: 'Engineered materials with sub-wavelength structures that manipulate sound waves in ways impossible with conventional materials. Used in our premium architectural solutions.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                reference: '7'
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-lg mr-6">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                    <p className="text-gray-600 mb-4">{tech.description}</p>
                    <a 
                      href={`https://soundzipper.com/blog/top-10-acoustic-innovations/`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                    >
                      View Technical White Paper
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="relative h-[600px] rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://www.finitesolutions.co.uk/wp-content/uploads/2021/10/Picture1.jpg"
              alt="Advanced acoustic technology in commercial application"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 bg-white text-blue-800 text-xs font-medium rounded-full mb-3 shadow-sm">
                Technology in Action
              </span>
              <h3 className="text-2xl font-bold text-white">Zendor Acoustic Research Lab</h3>
              <p className="text-white/90 mt-2">Testing our proprietary diffusion technology</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-colors shadow-md hover:shadow-lg inline-flex items-center">
            Schedule Technology Demonstration
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}