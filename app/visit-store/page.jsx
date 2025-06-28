// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { MapPin, Clock, Phone, Mail, Car, Bike, Bus } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// const VisitStore = () => {
//   const [phoneNumber, setPhoneNumber] = useState(8433900692);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [name, setName] = useState("");
//   const router = useRouter();

//   const handleNormalMessage = () => {
//     if (!phoneNumber) return;
//     const message = encodeURIComponent(
//       `Hi!My name is ${name}. I would like to visit your store. Please provide more information.`
//     );
//     window.open(`tel:${phoneNumber}?body=${message}`, "_blank");
//   };
//   const handleWhatsAppMessage = () => {
//     if (!phoneNumber || !name.trim()) return;
//     const message = encodeURIComponent(
//       `Hi!My name is ${name}. I would like to visit your store. Please provide more information.`
//     );
//     window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <section className="relative h-[60vh] -mt-10 min-h-[400px]">
//         <Image
//           src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format"
//           alt="Modern Interior Showroom"
//           fill
//           className="object-cover brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Let's connect in person - we'd love to meet you.
//             </h1>
//             <button
//               onClick={() => {
//                 const elem = document.getElementById("contact-section");
//                 if (elem) {
//                   elem.scrollIntoView({ behavior: "smooth" });
//                 }
//               }}
//               className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
//             >
//               Request a Callback
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Store Information */}
//       <section className="py-12 px-4 max-w-6xl mx-auto"  id="contact-section">
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold">Store Information</h2>

//             <div className="flex items-start gap-4">
//               <MapPin className="w-6 h-6 text-gray-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Address</h3>
//                 <p className="text-gray-600">
//                   A-501 Orchid Business Park Military Road Marol
//                   Andheri East Mumbai
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <Clock className="w-6 h-6 text-gray-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Opening Hours</h3>
//                 <p className="text-gray-600">Mon-Sun: 10 AM - 8 PM</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <Phone className="w-6 h-6 text-gray-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Phone</h3>
//                 <p className="text-gray-600">+91 84339 00692</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <Mail className="w-6 h-6 text-gray-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Email</h3>
//                 <p className="text-gray-600">myzendor@gmail.com</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-6 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-6">How to Reach Us</h2>
//             <div className="grid grid-cols-3 gap-4 mb-8">
//               <div className="text-center p-4 bg-white rounded-lg">
//                 <Car className="w-8 h-8 mx-auto mb-2 text-gray-600" />
//                 <span className="text-sm">By Car</span>
//               </div>
//               <div className="text-center p-4 bg-white rounded-lg">
//                 <Bike className="w-8 h-8 mx-auto mb-2 text-gray-600" />
//                 <span className="text-sm">By Bike</span>
//               </div>
//               <div className="text-center p-4 bg-white rounded-lg">
//                 <Bus className="w-8 h-8 mx-auto mb-2 text-gray-600" />
//                 <span className="text-sm">By Public Transport</span>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg">
//               <h3 className="text-lg font-medium mb-4">
//                 Want to visit? Let's talk first.
//               </h3>
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Enter Your Good Name"
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 Send a Message to Us, before visiting us.
//                 <button
//                   onClick={handleWhatsAppMessage}
//                   className="w-full flex items-center mt-1.5 justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
//                 >
//                   <FaWhatsapp className="text-xl" />
//                   Send WhatsApp Message
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Visit Section */}
//       <section className="bg-gray-50 py-12 px-4">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-2xl font-semibold mb-8 text-center">
//             Why Visit Zendor
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg">
//               <h3 className="text-lg font-medium mb-2">Meet Our Team</h3>
//               <p className="text-gray-600">
//                 Connect with our experienced team for personalized guidance.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg">
//               <h3 className="text-lg font-medium mb-2">
//                 Get Tailored Solutions
//               </h3>
//               <p className="text-gray-600">
//                 Receive personalized advice and solutions for your needs.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg">
//               <h3 className="text-lg font-medium mb-2">
//                 Explore Custom Designs
//               </h3>
//               <p className="text-gray-600">
//                 Discover our portfolio of unique designs and possibilities.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-12 px-4 max-w-6xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-8 text-center">
//           What Our Clients Say
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center mb-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
//               <div>
//                 <h3 className="font-medium">Lalith Kumar</h3>
//                 <p className="text-gray-500 text-sm">2 months ago</p>
//               </div>
//             </div>
//             <div className="flex mb-3">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className="w-5 h-5 text-yellow-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <p className="text-gray-600">
//               "The team at Zendor transformed our living space with their
//               premium wallpapers. Their attention to detail and professional
//               installation made all the difference."
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center mb-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
//               <div>
//                 <h3 className="font-medium">Priya Sharma</h3>
//                 <p className="text-gray-500 text-sm">3 months ago</p>
//               </div>
//             </div>
//             <div className="flex mb-3">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className="w-5 h-5 text-yellow-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <p className="text-gray-600">
//               "The acoustic solutions provided by Zendor have significantly
//               improved our home theater experience. Their expertise in sound
//               management is exceptional."
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center mb-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
//               <div>
//                 <h3 className="font-medium">Arun Patel</h3>
//                 <p className="text-gray-500 text-sm">1 month ago</p>
//               </div>
//             </div>
//             <div className="flex mb-3">
//               {[...Array(4)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className="w-5 h-5 text-yellow-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <p className="text-gray-600">
//               "The wooden flooring installation was seamless, and the quality is
//               outstanding. Their design suggestions helped us choose the perfect
//               style for our home."
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products Section */}
//       <section className="bg-gray-50 py-12 px-4">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-2xl font-semibold mb-8 text-center">
//             Featured Products
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//               <div className="relative h-48">
//                 <Image
//                   src="https://www.ddecor.com/media/wysiwyg/MODERN_METALLICS_1_main.jpg"
//                   alt="Premium Wallpapers"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-medium text-lg mb-2">Premium Wallpapers</h3>
//                 <p className="text-gray-600 mb-4">
//                   Exclusive collection of designer wallpapers for your walls
//                 </p>
//                 <button
//                   onClick={() => router.push("/category/wallpaper/All")}
//                   className="text-blue-600 font-medium hover:text-blue-700"
//                 >
//                   View Collection →
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//               <div className="relative h-48">
//                 <Image
//                   src="https://www.thefloorgallery.sg/wp-content/uploads/acoustic-wall-panels-balancing-sound-and-design-in-modern-spaces.jpg"
//                   alt="Acoustic Solutions"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-medium text-lg mb-2">Acoustic Solutions</h3>
//                 <p className="text-gray-600 mb-4">
//                   Professional sound management systems for any space
//                 </p>
//                 <button
//                   onClick={() => router.push("/category/acoustics")}
//                   className="text-blue-600 font-medium hover:text-blue-700"
//                 >
//                   View Collection →
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg overflow-hidden shadow-sm">
//               <div className="relative h-48">
//                 <Image
//                   src="https://www.lifecoreflooring.com/wp-content/uploads/2019/04/Kitchen-Hardwood-Flooring-Options.png"
//                   alt="Wooden Flooring"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-medium text-lg mb-2">Wooden Flooring</h3>
//                 <p className="text-gray-600 mb-4">
//                   Premium quality wooden flooring solutions
//                 </p>
//                 <button
//                   onClick={() => router.push("/category/wooden flooring/All")}
//                   className="text-blue-600 font-medium hover:text-blue-700"
//                 >
//                   View Collection →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Visiting FAQs */}
//       <section className="py-12 px-4 max-w-6xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-8">Visiting FAQs</h2>
//         <div className="space-y-4">
//           <div className="border rounded-lg">
//             <button
//               className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//               onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
//             >
//               <span className="font-medium">What are the store hours?</span>
//               <svg
//                 className={`w-5 h-5 transform transition-transform ${
//                   openFaq === 1 ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {openFaq === 1 && (
//               <div className="p-4 pt-0 text-gray-600">
//                 Our store is open Monday to Friday from 9 AM to 6 PM, and on
//                 Saturdays from 10 AM to 4 PM. We are closed on Sundays and
//                 public holidays.
//               </div>
//             )}
//           </div>

//           <div className="border rounded-lg">
//             <button
//               className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//               onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
//             >
//               <span className="font-medium">
//                 Do I need an appointment to visit?
//               </span>
//               <svg
//                 className={`w-5 h-5 transform transition-transform ${
//                   openFaq === 2 ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {openFaq === 2 && (
//               <div className="p-4 pt-0 text-gray-600">
//                 While walk-ins are welcome, we recommend scheduling an
//                 appointment to ensure our design consultants can give you their
//                 full attention. You can easily book an appointment through
//                 WhatsApp or by calling us.
//               </div>
//             )}
//           </div>

//           <div className="border rounded-lg">
//             <button
//               className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//               onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
//             >
//               <span className="font-medium">
//                 What services can I discuss in person?
//               </span>
//               <svg
//                 className={`w-5 h-5 transform transition-transform ${
//                   openFaq === 3 ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {openFaq === 3 && (
//               <div className="p-4 pt-0 text-gray-600">
//                 You can discuss all our services including wallpaper
//                 installation, acoustic solutions, wooden flooring, and custom
//                 interior designs. Our experts will be happy to show you samples
//                 and discuss your specific requirements.
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Ready to Visit */}
//       <section className="bg-gray-50 py-12 px-4">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold mb-4">Ready to Visit?</h2>
//           <p className="text-gray-600 mb-8">
//             Contact us to schedule a visit or get immediate assistance.
//           </p>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={handleNormalMessage}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
//             >
//               <FaWhatsapp className="text-xl" />
//               Send a WhatsApp Message
//             </button>
//             <a
//               href="tel:+15551234567"
//               className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
//             >
//               Call Us
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Fixed WhatsApp Button */}
//       <a
//         href="https://wa.me/+15551234567"
//         className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <FaWhatsapp className="text-2xl" />
//       </a>
//     </div>
//   );
// };

// export default VisitStore;
"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Car, Bike, Bus, ChevronDown } from "lucide-react";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const VisitStore = () => {
  const [phoneNumber] = useState(8433900692);
  const [openFaq, setOpenFaq] = useState(null);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleWhatsAppMessage = () => {
    if (!phoneNumber || !name.trim()) return;
    const message = encodeURIComponent(
      `Hello Zendor Team,\n\nI'm ${name} and I would like to schedule a visit to your showroom.\n\nPlease provide available time slots and any preparation needed for our meeting.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmail = () => {
    const email = "myzendor@gmail.com";
    const subject = encodeURIComponent("Showroom Visit Appointment");
    const body = encodeURIComponent(
      `Dear Zendor Team,\n\nI would like to schedule a visit to your showroom.\n\nName: ${name}\n\nPreferred Date/Time:\n\nProject Details:\n`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format"
          alt="Zendor Showroom Interior"
          fill
          className="object-cover brightness-75"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 flex items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Experience Zendor in Person
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Visit our premium showroom to explore our collections and consult with our design experts
            </p>
            <motion.button
              onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Your Visit
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="contact-section">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                Our Showroom
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Zendor Design Studio
              </h2>
              <p className="text-xl text-gray-600">
                Where innovation meets craftsmanship
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    A-501 Orchid Business Park, Military Road,<br />
                    Marol, Andheri East, Mumbai - 400059
                  </p>
                  <button 
                    onClick={() => window.open("https://maps.google.com?q=A-501+Orchid+Business+Park+Military+Road+Marol+Andheri+East+Mumbai", "_blank")}
                    className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-flex items-center"
                  >
                    View on Map
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Opening Hours</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between max-w-xs">
                      <span>Monday - Friday</span>
                      <span>10:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between max-w-xs">
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between max-w-xs">
                      <span>Sunday</span>
                      <span>By Appointment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-600">+91 84339 00692</p>
                  <div className="flex gap-4 mt-3">
                    <button 
                      onClick={handleCall}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Call Now
                    </button>
                    <button 
                      onClick={handleWhatsAppMessage}
                      className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">myzendor@gmail.com</p>
                  <button 
                    onClick={handleEmail}
                    className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-flex items-center"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="relative h-full min-h-[400px]">
              <Image
                src="https://maps.googleapis.com/maps/api/staticmap?center=A-501+Orchid+Business+Park+Military+Road+Marol+Andheri+East+Mumbai&zoom=15&size=800x600&maptype=roadmap&markers=color:red%7CA-501+Orchid+Business+Park+Military+Road+Marol+Andheri+East+Mumbai&key=YOUR_API_KEY"
                alt="Zendor Showroom Location"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transportation Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How To Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convenient transportation options to our premium showroom
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Car className="w-10 h-10 mx-auto text-blue-600" />,
                title: "By Car",
                description: "Ample parking available in the business park",
                details: "Nearest landmark: Opposite Andheri Fire Station"
              },
              {
                icon: <Bike className="w-10 h-10 mx-auto text-blue-600" />,
                title: "By Two-Wheeler",
                description: "Dedicated two-wheeler parking available",
                details: "GPS coordinates: 19.1176° N, 72.8638° E"
              },
              {
                icon: <Bus className="w-10 h-10 mx-auto text-blue-600" />,
                title: "Public Transport",
                description: "5 min walk from Andheri Metro Station (Line 1)",
                details: "Bus routes: 326, 321, 351 stop nearby"
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-sm text-gray-500">{option.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              The Zendor Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Visit Our Showroom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of experiencing our solutions in person
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Material Samples",
                description: "Touch and feel our premium materials and finishes in person",
                highlight: "200+ material samples available"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Expert Consultation",
                description: "One-on-one sessions with our design specialists",
                highlight: "30+ years combined experience"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Immersive Displays",
                description: "Experience our solutions in realistic room settings",
                highlight: "5 themed display areas"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Custom Solutions",
                description: "Discuss bespoke options tailored to your space",
                highlight: "100% customizable designs"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Instant Quotes",
                description: "Get preliminary estimates during your visit",
                highlight: "Transparent pricing"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Exclusive Offers",
                description: "Showroom-only promotions and discounts",
                highlight: "Special financing options"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.floor(index/2) * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-lg mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 mb-3">{benefit.description}</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What our visitors say about their showroom experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Lalith Kumar",
                role: "Homeowner, Bandra",
                rating: 5,
                comment: "The showroom visit transformed my design decisions. Seeing the materials in person made all the difference. The consultant's expertise helped me visualize the perfect solution for my space.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Priya Sharma",
                role: "Interior Designer",
                rating: 5,
                comment: "As a professional designer, I appreciate the breadth of samples and technical knowledge available. The Zendor team understands both aesthetics and functionality at the highest level.",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Arun Patel",
                role: "Architect",
                rating: 4,
                comment: "The showroom displays demonstrate real-world applications beautifully. My clients always appreciate visiting to see options firsthand before making final selections.",
                image: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Visit
            </h2>
            <p className="text-xl text-gray-600">
              Book an appointment for a personalized showroom experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest *
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                >
                  <option value="">Select interest</option>
                  <option value="Wallpapers">Wallpapers</option>
                  <option value="Acoustic Solutions">Acoustic Solutions</option>
                  <option value="Wooden Flooring">Wooden Flooring</option>
                  <option value="Complete Interior Design">Complete Interior Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                  placeholder="Tell us about your project and any specific requirements..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Appointment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-full mb-4 shadow-sm">
              Visitor Information
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know before your visit
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What are your showroom hours?",
                answer: "Our showroom is open Monday to Friday from 10:00 AM to 8:00 PM, and Saturdays from 10:00 AM to 6:00 PM. We're closed on Sundays but available by appointment for special circumstances."
              },
              {
                question: "Do I need an appointment to visit?",
                answer: "While walk-ins are welcome, we highly recommend scheduling an appointment to ensure our design consultants can dedicate their full attention to your project. Appointments also allow us to prepare relevant samples and information specific to your needs."
              },
              {
                question: "How long does a typical consultation take?",
                answer: "Most consultations last between 60-90 minutes, depending on the complexity of your project. For comprehensive projects, we may schedule follow-up visits to refine details and review proposals."
              },
              {
                question: "What should I bring to my appointment?",
                answer: "Please bring any inspiration images, room dimensions, or architectural plans you may have. If you're working with specific color schemes or materials from other vendors, samples of those would be helpful as well."
              },
              {
                question: "Is parking available at your location?",
                answer: "Yes, our business park offers ample parking for both cars and two-wheelers. We also validate parking for appointments lasting over one hour."
              },
              {
                question: "Can I bring my architect or contractor to the consultation?",
                answer: "Absolutely! We encourage collaboration with your design and construction team. Many of our clients find it valuable to have all stakeholders present to align on vision and technical requirements."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transform transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Visit our showroom to experience the Zendor difference firsthand
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={handleWhatsAppMessage}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-flex items-center">
                  <FaWhatsapp className="mr-2 text-lg" />
                  Chat on WhatsApp
                </span>
              </motion.button>
              <motion.button
                onClick={handleCall}
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call +91 84339 00692
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>
    </div>
  );
};

export default VisitStore;