import { useState } from 'react';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import axiosInstance from '@/utils/AxiosInstance';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axiosInstance.post('/acoustics', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = '919876543210'; // Replace with your WhatsApp number
    const message = encodeURIComponent(`Hi, I'd like to know more about your acoustic solutions.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const email = 'myzendor@gmail.com'; // Replace with your email
    const subject = encodeURIComponent('Inquiry about Acoustic Solutions');
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-green-600 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-600 text-lg">
              Your details have been submitted successfully. We will get back to you soon.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section  id="contact-form" className="py-16 bg-gradient-to-b  from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Have questions about our acoustic solutions? We're here to help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 outline-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="+91  9876543210"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 outline-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <div className="flex gap-4 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 cursor-pointer py-3 px-6 rounded-lg text-white font-medium transition duration-200 ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            <button
              type="button"
              onClick={handleWhatsApp}
              className="p-3 rounded-lg cursor-pointer bg-green-500 hover:bg-green-600 text-white transition duration-200"
              title="Contact via WhatsApp"
            >
              <FaWhatsapp size={24} />
            </button>

            <button
              type="button"
              onClick={handleEmail}
              className="p-3 rounded-lg cusror-pointer bg-red-500 hover:bg-red-600 text-white transition duration-200"
              title="Contact via Email"
            >
              <MdEmail size={24} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}