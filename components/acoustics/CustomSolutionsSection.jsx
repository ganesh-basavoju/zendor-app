import Image from 'next/image';

export default function CustomSolutionsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">
          Tailored Acoustic Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-[450px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://wsdg.com/wp-content/uploads/news_hiddenwires.jpg"
                alt="Custom acoustic solution demonstration"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Personalized Acoustic Design
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our expert team creates customized acoustic solutions that perfectly match your space's unique requirements <mcreference link="https://acousticalsolutions.com/" index="8">8</mcreference>.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Analysis</h4>
                <p className="text-sm text-gray-600">Comprehensive acoustic assessment of your space</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Design</h4>
                <p className="text-sm text-gray-600">Tailored solutions using advanced modeling</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Implementation</h4>
                <p className="text-sm text-gray-600">Expert installation and calibration</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Optimization</h4>
                <p className="text-sm text-gray-600">Continuous monitoring and adjustment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}