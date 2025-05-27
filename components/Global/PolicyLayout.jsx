import { poppins } from "@/app/page";

export default function PolicyLayout({ title, children }) {
  return (
    <div className={`min-h-screen ${poppins.variable}`}>
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[320px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(/indoor-bg.png)',
            filter: 'grayscale(50%)',
          }} 
        />
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 lg:p-16">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
