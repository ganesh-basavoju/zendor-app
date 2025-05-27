"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Car, Bike, Bus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const VisitStore = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleWhatsAppMessage = () => {
    if (!phoneNumber) return;
    const message = encodeURIComponent(
      "Hi! I would like to visit your store. Please provide more information."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format"
          alt="Modern Interior Showroom"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's connect in person - we'd love to meet you.
            </h1>
            <button
              onClick={() => {
                document.querySelector("#store-info").scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition cursor-pointer"

            >
              Request a Callback
            </button>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-12 px-4 max-w-6xl mx-auto" id="store-info">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Store Information</h2>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">
                  A-501 Orchid Business Park Military Road Marol Andheri East
                  Mumbai
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium">Opening Hours</h3>
                <p className="text-gray-600">Mon-Sun: 10 AM - 8 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+91 84339 00692</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">myzendor@gmail.com</p>
              </div>
            </div>
            <div className="mt-6 rounded-lg overflow-hidden shadow-sm h-[300px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7862000460214!2d72.87272087497825!3d19.107843982108674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c83e4a8c5e67%3A0x3a1e8c4f2e3f4c5d!2sOrchid%20Business%20Park%2C%20Military%20Rd%2C%20Marol%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400059!5e0!3m2!1sen!2sin!4v1649234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">How to Reach Us</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg">
                <Car className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <span className="text-sm">By Car</span>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Bike className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <span className="text-sm">By Bike</span>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Bus className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <span className="text-sm">By Public Transport</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                Want to visit? Let's talk first.
              </h3>
              <div className="space-y-4">
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button
                  onClick={handleWhatsAppMessage}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  <FaWhatsapp className="text-xl" />
                  Send WhatsApp Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Why Visit Zendor
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Meet Our Team</h3>
              <p className="text-gray-600">
                Connect with our experienced team for personalized guidance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                Get Tailored Solutions
              </h3>
              <p className="text-gray-600">
                Receive personalized advice and solutions for your needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                Explore Custom Designs
              </h3>
              <p className="text-gray-600">
                Discover our portfolio of unique designs and possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Image
                width={200}
                height={200}
                className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                src={
                  "https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_960_720.jpg"
                }
                alt="client_pic"
              />

              <div>
                <h3 className="font-medium">Lalith Kumar</h3>
                <p className="text-gray-500 text-sm">2 months ago</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">
              "The team at Zendor transformed our living space with their
              premium wallpapers. Their attention to detail and professional
              installation made all the difference."
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Image
                width={200}
                height={200}
                className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                src={
                  "https://images.generated.photos/E_pKlcsQQdq4fvCC4b6uiMZsJg4XjSLzhcGwk0SBFcs/g:no/rs:fill:256:384/czM6Ly9ncGhvdG9z/LXByb2QtaHVtYW4t/Z2FsbGVyeS8yMDUx/L2E3Mjg2ODY3LWNk/ZjktNDE2Mi1hODU1/LTk0OWY4OTZkODA2/ZS0xLmpwZw.jpg"
                }
                alt="client_pic"
              />
              <div>
                <h3 className="font-medium">Priya Sharma</h3>
                <p className="text-gray-500 text-sm">3 months ago</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">
              "The acoustic solutions provided by Zendor have significantly
              improved our home theater experience. Their expertise in sound
              management is exceptional."
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Image
                width={200}
                height={200}
                className="w-12 h-12 rounded-full bg-gray-200 mr-4"
                src={
                  "https://img.freepik.com/premium-photo/young-bearded-indian-businessman-relaxing-mall-bangkok_251136-53368.jpg?semt=ais_hybrid&w=740"
                }
                alt="client_pic"
              />

              <div>
                <h3 className="font-medium">Arun Patel</h3>
                <p className="text-gray-500 text-sm">1 month ago</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">
              "The wooden flooring installation was seamless, and the quality is
              outstanding. Their design suggestions helped us choose the perfect
              style for our home."
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/wall.png"
                  alt="Premium Wallpapers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">Premium Wallpapers</h3>
                <p className="text-gray-600 mb-4">
                  Exclusive collection of designer wallpapers for your walls
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  View Collection →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/indoor-bg.png"
                  alt="Acoustic Solutions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">Acoustic Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Professional sound management systems for any space
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  View Collection →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/handcraft.png"
                  alt="Wooden Flooring"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">Wooden Flooring</h3>
                <p className="text-gray-600 mb-4">
                  Premium quality wooden flooring solutions
                </p>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  View Collection →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visiting FAQs */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Visiting FAQs</h2>
        <div className="space-y-4">
          <div className="border rounded-lg">
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
            >
              <span className="font-medium">What are the store hours?</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openFaq === 1 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 1 && (
              <div className="p-4 pt-0 text-gray-600">
                Our store is open Monday to Friday from 9 AM to 6 PM, and on
                Saturdays from 10 AM to 4 PM. We are closed on Sundays and
                public holidays.
              </div>
            )}
          </div>

          <div className="border rounded-lg">
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            >
              <span className="font-medium">
                Do I need an appointment to visit?
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openFaq === 2 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 2 && (
              <div className="p-4 pt-0 text-gray-600">
                While walk-ins are welcome, we recommend scheduling an
                appointment to ensure our design consultants can give you their
                full attention. You can easily book an appointment through
                WhatsApp or by calling us.
              </div>
            )}
          </div>

          <div className="border rounded-lg">
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            >
              <span className="font-medium">
                What services can I discuss in person?
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openFaq === 3 ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFaq === 3 && (
              <div className="p-4 pt-0 text-gray-600">
                You can discuss all our services including wallpaper
                installation, acoustic solutions, wooden flooring, and custom
                interior designs. Our experts will be happy to show you samples
                and discuss your specific requirements.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ready to Visit */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Visit?</h2>
          <p className="text-gray-600 mb-8">
            Contact us to schedule a visit or get immediate assistance.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleWhatsAppMessage}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              Send a WhatsApp Message
            </button>
            <a
              href="tel:+15551234567"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/+15551234567"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
};

export default VisitStore;

{
  /* Google Maps Embed */
}
<div className="mt-6 rounded-lg overflow-hidden shadow-sm h-[300px] w-full">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7862000460214!2d72.87272087497825!3d19.107843982108674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c83e4a8c5e67%3A0x3a1e8c4f2e3f4c5d!2sOrchid%20Business%20Park%2C%20Military%20Rd%2C%20Marol%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400059!5e0!3m2!1sen!2sin!4v1649234567890!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>;
