import Image from "next/image";

const applications = [
  {
    title: "Home Theatres",
    description:
      "Premium acoustic solutions for immersive entertainment experiences",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1",
  },
  {
    title: "Corporate Offices",
    description:
      "Professional sound management for productive work environments",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1",
  },
  {
    title: "Luxury Homes",
    description:
      "Elegant acoustic treatments that complement high-end interiors",
    image: "https://wsdg.com/wp-content/uploads/news_hiddenwires.jpg",
  },
  {
    title: "Shopping Malls",
    description: "Ambient noise control for comfortable shopping experiences",
    image:
      "https://archello.s3.eu-central-1.amazonaws.com/images/2020/05/19/Gustafs-Acoustic-Wood-Panels-4.1589871178.9004.jpg",
  },
  {
    title: "Amphitheatres",
    description: "Superior acoustics for live performances and events",
    image:
      "https://i.redd.it/34mcot6e63mb1.jpg",
  },
  {
    title: "Mini Theatres",
    description: "Compact acoustic solutions for private screening rooms",
    image: "https://www.auralexchange.com/wp-content/uploads/2017/11/hometheater5.jpg",
  },
  {
    title: "Conference Rooms",
    description:
      "Sound-dampening solutions with perforated systems for privacy and focused discussions",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1",
  },
  {
    title: "Luxury Spaces",
    description:
      "High-performance acoustic treatments that blend seamlessly with elegant interior design",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1",
  },
];

export const ApplicationsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Acoustic Applications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our acoustic solutions transform various spaces into
            perfect sound environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/40 transition-colors duration-300 z-10" />
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {app.title}
                  </h3>
                  <p className="text-gray-200 text-sm">{app.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
