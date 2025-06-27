// import { poppins } from "@/app/page";
// import {
//   Facebook,
//   Instagram,
//   Mail,
//   Phone,
//   MessageCircle,
//   MapPin,
//   Twitter,
//   Youtube,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// const footerLinks = {
//   company: [
//     { title: "About Us", href: "/about" },
//     { title: "Our Story", href: "/story" },
//     // { title: "Careers", href: "/careers" },
//     // { title: "Press", href: "/press" }
//   ],
//   support: [
//     { title: "Contact", href: "/contact" },
//     { title: "Order Tracking", href: "/order-tracking" },
//     // { title: "Shipping Info", href: "/shipping" },
//     // { title: "Returns", href: "/returns" },
//   ],
//   legal: [
//     { title: "Terms of Service", href: "/terms" },
//     { title: "Privacy Policy", href: "/privacy" },
//     { title: "Cookie Policy", href: "/cookies" },
//   ],
// };

// export default function Footer() {
//   return (
//     <footer className={`bg-gray-900 mt-1 ${poppins.variable}`}>
//       <div className="max-w-7xl mx-auto px-4 pt-10 pb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Brand Section */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold text-white">zendor</h2>
//               <p className="text-gray-400 mt-4 leading-relaxed">
//                 Elevating interiors with artistic precision. Explore premium
//                 wallpapers, wooden floorings, and acoustic panels tailored for
//                 timeless elegance.
//               </p>
//             </div>
//             <div className="flex space-x-4">
//               {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
//                 >
//                   <Icon size={20} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3 text-gray-400">
//                 <Mail size={18} />
//                 <span>myzendor@gmail.com</span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-400">
//                 <Phone size={18} />
//                 <span>+91 84339 00692 </span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-400">
//                 <MapPin size={18} />
//                 <span>
//                   10:00 AM – 8:00 PM IST <br />
//                   Mon – Sun
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Company Links */}
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold text-white">Explore</h3>
//             <div className="grid grid-cols-1 gap-3">
//               {footerLinks.company.map((link, index) => (
//                 <Link
//                   key={index}
//                   href={link.href}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   {link.title}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Customer Care */}
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold text-white">Customer Care</h3>
//             <div className="grid grid-cols-1 gap-3">
//               {footerLinks.support.map((link, index) => (
//                 <Link
//                   key={index}
//                   href={link.href}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   {link.title}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-16 pt-8 border-t border-gray-800">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-gray-400 text-sm">
//               © {new Date().getFullYear()} zendor. Crafted with elegance.
//             </p>
//             <div className="flex space-x-6">
//               {footerLinks.legal.map((link, index) => (
//                 <Link
//                   key={index}
//                   href={link.href}
//                   className="text-gray-400 hover:text-white text-sm transition-colors"
//                 >
//                   {link.title}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
import { poppins } from "@/app/page";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Story", href: "/story" },
    // { title: "Careers", href: "/careers" },
    // { title: "Press", href: "/press" }
  ],
  support: [
    { title: "Contact", href: "/contact" },
    { title: "Order Tracking", href: "/order-tracking" },
    // { title: "Shipping Info", href: "/shipping" },
    // { title: "Returns", href: "/returns" },
  ],
  legal: [
    { title: "Terms of Service", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Cookie Policy", href: "/cookies" },
  ],
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const linkHoverVariants = {
  hover: {
    x: 5,
    color: "#ffffff",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function Footer() {
  return (
    <footer
      className={`bg-gray-900 mt-1 ${poppins.variable} relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      <motion.div
        className="max-w-7xl mx-auto px-4 pt-16 pb-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <motion.h2
                className="text-3xl font-bold text-white mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                zendor
              </motion.h2>
              <motion.p
                className="text-gray-400 leading-relaxed text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Elevating interiors with artistic precision. Explore premium
                wallpapers, wooden floorings, and acoustic panels tailored for
                timeless elegance.
              </motion.p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <motion.div
                className="flex items-start space-x-4 text-gray-400 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail
                  size={18}
                  className="mt-1 group-hover:text-white transition-colors"
                />
                <div>
                  <span className="group-hover:text-white transition-colors">
                    myzendor@gmail.com
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4 text-gray-400 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone
                  size={18}
                  className="mt-1 group-hover:text-white transition-colors"
                />
                <div>
                  <span className="group-hover:text-white transition-colors">
                    +91 84339 00692
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4 text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin size={18} className="mt-1" />
                <div className="text-sm">
                  <div>10:00 AM – 8:00 PM IST</div>
                  <div>Mon – Sun</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              Explore
            </h3>
            <div className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.div
                  key={index}
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customer Care */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              Customer Care
            </h3>
            <div className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <motion.div
                  key={index}
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-20 pt-8 border-t border-gray-800"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.p
              className="text-gray-400 text-sm"
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              © {new Date().getFullYear()} zendor. Crafted with elegance.
            </motion.p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-8">
              {footerLinks.legal.map((link, index) => (
                <motion.div key={index} whileHover={{ y: -2 }}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Powered by section */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-800"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-xs text-center">
            Powered by Zendor Technologies Private Limited , Managed by OnlyUsmedia 
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
