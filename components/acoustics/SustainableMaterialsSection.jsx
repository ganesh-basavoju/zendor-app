import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SustainableMaterialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
            Sustainable Innovation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eco-Conscious Acoustic Engineering
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            High-performance sustainable materials meeting the demands of green building certifications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Natural Fiber Systems',
              description: 'Premium acoustic materials sourced from rapidly renewable resources including hemp, organic cotton, and FSC-certified wood fibers. Engineered for commercial environments requiring both sustainability and superior acoustic performance.',
              image: 'https://i.ibb.co/YFYMWg0s/image-17-3.jpg',
              features: [
                'Cradle-to-Cradle certified options',
                'Class A fire rated',
                'Up to 0.95 NRC ratings',
                'Contributes to LEED v4.1 credits'
              ],
              badge: 'Biophilic Design'
            },
            {
              title: 'Recycled Material Solutions',
              description: 'Advanced acoustic products utilizing post-consumer recycled content including PET from ocean plastics and recycled denim. Ideal for corporate sustainability initiatives without compromising acoustic requirements.',
              image: 'https://i.ibb.co/Nnyc0fSf/image-22-3.jpg',
              features: [
                'Up to 95% recycled content',
                'GREENGUARD Gold certified',
                'Modular installation systems',
                '10-year performance warranty'
              ],
              badge: 'Circular Economy'
            },
            {
              title: 'Hybrid Composite Technology',
              description: 'Cutting-edge composites combining natural and technical materials for maximum acoustic control and minimal environmental impact. The choice for high-end architectural projects with stringent sustainability goals.',
              image: 'https://i.ibb.co/SDM83vK2/image-21-2.jpg',
              features: [
                'Custom thickness and densities',
                'Red List compliant',
                'Integrated HVAC compatibility',
                'BREEAM and WELL compliant'
              ],
              badge: 'Innovation Award'
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {item.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white text-green-800 text-xs font-medium rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-3">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button className="text-green-600 hover:text-green-800 font-medium flex items-center text-sm">
                    Download Technical Specifications
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white hover:bg-gray-50 text-green-600 rounded-lg border border-green-600 text-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center mx-auto">
            Request Sustainability Report
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}