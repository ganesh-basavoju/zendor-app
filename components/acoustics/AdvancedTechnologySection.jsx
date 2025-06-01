import Image from 'next/image';

export default function AdvancedTechnologySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 md:px-8 px-6">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">
          Advanced Acoustic Technologies
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                3D Volumetric Diffusers
              </h3>
              <p className="text-gray-600">
                State-of-the-art diffusion technology that creates immersive acoustic environments, perfect for concert halls and performance spaces <mcreference link="https://soundzipper.com/blog/top-10-acoustic-innovations/" index="5">5</mcreference>.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Active Noise Control
              </h3>
              <p className="text-gray-600">
                Smart systems that automatically detect and neutralize unwanted noise through advanced signal processing <mcreference link="https://www.startus-insights.com/innovators-guide/new-noise-control-solutions/" index="6">6</mcreference>.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Metamaterial Acoustics
              </h3>
              <p className="text-gray-600">
                Revolutionary materials engineered at the microscopic level for unprecedented sound control capabilities <mcreference link="https://www.sciencedirect.com/science/article/pii/S0360132324000921" index="7">7</mcreference>.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://www.finitesolutions.co.uk/wp-content/uploads/2021/10/Picture1.jpg"
              alt="Advanced acoustic technology visualization"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}