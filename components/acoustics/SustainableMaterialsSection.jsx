import Image from 'next/image';

export default function SustainableMaterialsSection() {
  return (
    <section className="py-16 bg-white md:px-8 px-6">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">
          Eco-Friendly Acoustic Solutions
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Natural Fibers',
              description: 'Sustainable acoustic materials from natural sources like hemp, sheep wool, and coconut coir that provide excellent sound absorption while being environmentally responsible.',
              image: 'https://i.ibb.co/YFYMWg0s/image-17-3.jpg',
              features: [
                'Eco-friendly materials',
                'High sound absorption',
                'Aesthetically pleasing',
                'Biodegradable options'
              ]
            },
            {
              title: 'Recycled Materials',
              description: 'Innovative solutions using recycled PET from plastic bottles and cellulose fibers, offering sustainable alternatives without compromising acoustic performance.',
              image: 'https://i.ibb.co/Nnyc0fSf/image-22-3.jpg',
              features: [
                'Reduces plastic waste',
                'Cost-effective production',
                'Versatile applications',
                'LEED credit eligible'
              ]
            },
            {
              title: 'Composite Solutions',
              description: 'Advanced materials combining natural and recycled components with technical fabrics for optimal acoustic performance and sustainability.',
              image: 'https://i.ibb.co/SDM83vK2/image-21-2.jpg',
              features: [
                'High-performance acoustics',
                'Customizable options',
                'Durable construction',
                'Sustainable manufacturing'
              ]
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}