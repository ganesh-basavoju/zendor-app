import Image from 'next/image';

export default function SmartAcousticSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">
          Smart Acoustic Technology
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              AI-Driven Acoustic Optimization
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Experience the future of sound management with our AI-powered acoustic solutions. Our smart systems continuously analyze and adjust to your environment's changing acoustic needs <mcreference link="https://vibebyvision.com/uncategorized/sustainable-acoustic-design/" index="1">1</mcreference>.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-600 mr-2">✓</span>
                <span>Real-time acoustic environment monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-600 mr-2">✓</span>
                <span>Predictive analytics for optimal sound control</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-600 mr-2">✓</span>
                <span>Automated adjustment for varying noise levels</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/acoustics/smart-acoustic.jpg"
              alt="AI-powered acoustic system"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}