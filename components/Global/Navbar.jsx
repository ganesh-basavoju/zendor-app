// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import {
//   FaMapMarkerAlt,
//   FaStore,
//   FaSearch,
//   FaChevronDown,
//   FaBars,
//   FaTimes,
//   FaUser,
//   FaCartPlus,
//   FaHeart,
// } from "react-icons/fa";
// import LocationModal from "./LocationModal";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "@/utils/AxiosInstance";
// import { login } from "@/store/userSlice";

// const Navbar = () => {
//   // Hooks must be called unconditionally at the top level
//   const pathname = usePathname();

//   // Don't render navbar if we're in an admin route (must be before any other hooks)
//   if (pathname?.startsWith("/admin")) {
//     return null;
//   }

//   // State hooks
//   const [showLocationModal, setShowLocationModal] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState("Mumbai");
//   const [selectedPincode, setSelectedPincode] = useState("400017");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [subcategoriesForWoodenFloorings, setSubcategoriesForWoodenFloorings] =
//     useState([]);
//   const [subcategoriesWallpaper, setSubcategoriesWallpaper] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [mobileMenuDropdowns, setMobileMenuDropdowns] = useState({
//     woodenFlooring: false,
//     wallpaper: false,
//   });

//   // Other hooks
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const islogin = useSelector((state) => state.user.isAuthenticated);
//   const isHomePage = pathname === "/";

//   // Menu items
//   const menuItems = ["Wallpaper", "Wooden Flooring", "Acoustics"];

//   // Async functions
//   const fetchWoodenFloorCategories = async () => {
//     try {
//       const res = await axiosInstance.get("/wooden-floors/getCategories");
//       if (res.status === 200) {
//         setSubcategoriesForWoodenFloorings(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchWallpaperCategories = async () => {
//     try {
//       const res = await axiosInstance.get("/wallpapers/getCategories");
//       if (res.status === 200) {
//         setSubcategoriesWallpaper(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       setShowSearchResults(false);
//       const res = await axiosInstance.get(
//         `/user/search-products?search=${searchQuery}`
//       );
//       if (res.status === 200) {
//         setProducts(res.data);
//       }
//     } catch (error) {
//       console.log(error);
//       setProducts([]);
//     }
//     setShowSearchResults(true);
//   };

//   const handleSignIn = () => {
//     if (islogin) {
//       router.push("/profile");
//       return;
//     }
//     router.push("/login");
//   };

//   const toggleMobileDropdown = (menu) => {
//     setMobileMenuDropdowns((prev) => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//   };

//   // Effect hooks
//   useEffect(() => {
//     fetchWoodenFloorCategories();
//     fetchWallpaperCategories();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       const mobileMenu = document.querySelector(".mobile-menu-container");
//       if (isMobileMenuOpen && mobileMenu && !mobileMenu.contains(e.target)) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     const handleScroll = () => {
//       if (isMobileMenuOpen) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     if (isMobileMenuOpen) {
//       document.addEventListener("click", handleClickOutside);
//       window.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const name = localStorage.getItem("name");
//     const email = localStorage.getItem("email");
//     if (token) {
//       dispatch(login({ token, name, email }));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() !== "") {
//       const timer = setTimeout(() => {
//         fetchProducts();
//       }, 300);
//       return () => clearTimeout(timer);
//     } else {
//       setProducts([]);
//       setShowSearchResults(false);
//     }
//   }, [searchQuery]);

//   useEffect(() => {
//     const savedLocation = localStorage.getItem("deliveryLocation");
//     if (savedLocation) {
//       try {
//         const { name, pincode } = JSON.parse(savedLocation);
//         setSelectedLocation(name);
//         setSelectedPincode(pincode);
//       } catch (e) {
//         console.error("Error parsing saved location:", e);
//       }
//     }
//   }, []);

//   return (
//     <nav
//       className={`w-full fixed top-0 z-50 transition-all duration-300 ${
//         isHomePage && !isScrolled
//           ? "bg-transparent backdrop-blur-md"
//           : "bg-[#012b5b] shadow-lg"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-2">
//         {/* Top navbar */}
//         <div className="flex items-center justify-between gap-4 py-1">
//           {/* Logo and Location */}
//           <div className="flex items-center space-x-6 min-w-[200px]">
//             <div
//               className="text-2xl font-bold text-white cursor-pointer transition-transform hover:scale-105"
//               onClick={() => router.push("/")}
//             >
//               Zendor
//             </div>
//             <button
//               onClick={() => setShowLocationModal(true)}
//               className="hidden md:flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
//             >
//               <FaMapMarkerAlt className="text-white" />
//               <span className="font-medium">{selectedLocation}</span>
//               <span className="text-gray-300">{selectedPincode}</span>
//             </button>
//           </div>

//           {/* Centered Search Bar */}
//           <div className="hidden md:block flex-1 max-w-2xl mx-auto">
//             <div className="relative group">
//               {/* // Modify the search input to prevent immediate state changes */}
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setSearchQuery(value);
//                 }}
//                 onFocus={() => {
//                   if (searchQuery.trim() !== "") {
//                     setShowSearchResults(true);
//                   }
//                 }}
//                 placeholder="Search for wallpapers, floorings, and more..."
//                 className="w-full pl-12 pr-4 py-1 rounded-full border border-gray-400 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30"
//               />
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

//               {/* Search Results - Updated styles */}
//               {showSearchResults && searchQuery && (
//                 <div className="absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-[60]">
//                   {products.length > 0 ? (
//                     <div className="max-h-[300px] overflow-y-auto bg-white">
//                       {products.map((product, index) => (
//                         <button
//                           key={`${product._id || product.id || index}`}
//                           onClick={() => {
//                             router.push(
//                               `/products/${
//                                 product.type == "wallpaper"
//                                   ? "wallpapers"
//                                   : "wooden-flooring"
//                               }/${product.id}`
//                             );
//                             setSearchQuery("");
//                             setShowSearchResults(false);
//                           }}
//                           className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between group bg-white"
//                         >
//                           <span>{product.name}</span>
//                           <span className="text-sm text-gray-500 group-hover:text-[#012b5b]">
//                             {product.category}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="px-4 py-3 text-gray-600 text-center bg-white">
//                       No products found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Navigation */}
//           <div className="hidden md:flex items-center space-x-6 min-w-[200px] justify-end text-white">
//             <button
//               onClick={() => router.push("/visit-store")}
//               className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
//             >
//               <FaStore />
//               <span>Visit Store</span>
//             </button>

//             <div className="flex items-center space-x-4">
//               {[
//                 { icon: FaUser, onClick: handleSignIn },
//                 {
//                   icon: FaHeart,
//                   name: "moodboard",
//                   onClick: () => router.push("/profile?to=3"),
//                 },
//                 { icon: FaCartPlus, onClick: () => router.push("/cart") },
//               ].map((item, index) => (
//                 <button
//                   key={`nav-icon-${index}`}
//                   onClick={item.onClick}
//                   className="p-2.5 cursor-pointer hover:bg-white/10 rounded-full transition-colors text-white"
//                 >
//                   {item?.name === "moodboard" ? (
//                     <svg
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <rect
//                         x="3"
//                         y="3"
//                         width="7"
//                         height="7"
//                         rx="1"
//                         stroke="white"
//                         stroke-width="2"
//                       />
//                       <rect
//                         x="14"
//                         y="3"
//                         width="7"
//                         height="7"
//                         rx="1"
//                         stroke="white"
//                         stroke-width="2"
//                       />
//                       <rect
//                         x="3"
//                         y="14"
//                         width="7"
//                         height="7"
//                         rx="1"
//                         stroke="white"
//                         stroke-width="2"
//                       />
//                       <path
//                         d="M15 14.5C15 13.6716 15.6716 13 16.5 13C17.3284 13 18 13.6716 18 14.5C18 15.3284 17.3284 16 16.5 16C15.6716 16 15 15.3284 15 14.5Z"
//                         fill="white"
//                       />
//                       <path
//                         d="M13.5 18C13.5 16.6193 14.6193 15.5 16 15.5C17.3807 15.5 18.5 16.6193 18.5 18V19H13.5V18Z"
//                         fill="white"
//                       />
//                     </svg>
//                   ) : (
//                     <item.icon className="text-xl" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2.5 hover:bg-white/30 rounded-lg transition-colors"
//           >
//             {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Categories Menu - Updated styles */}
//         <div className="hidden md:flex justify-center mt-1  border-t border-white/10 pt-2">
//           <button
//           onClick={()=>{
//             router.push("/products/explore")
//           }}
//            className="text-white/80  relative group w-[100px]  text-centerflex items-center transition-colors py-2  mr-5 cursor-pointer ">
//             Explore All{" "}
//             <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
//           </button>

//           <div className="flex space-x-8 items-center">
//             {menuItems.map((item) => {
//               const path = `/category/${item.toLowerCase()}`;
//               const isActive = pathname.startsWith(path);
//               return (
//                 <button
//                   key={item}
//                   onClick={() => {
//                     if (path !== "/category/acoustics") {
//                       router.push(path + "/All");
//                     } else {
//                       router.push(path);
//                     }
//                   }}
//                   className={`group relative px-3 py-2 transition-colors ${
//                     isActive
//                       ? "text-white font-medium"
//                       : "text-gray-300 hover:text-white"
//                   }`}
//                 >
//                   <span className="flex items-center space-x-1">
//                     {item}
//                     <FaChevronDown
//                       className={`ml-1 transition-transform group-hover:rotate-180`}
//                     />
//                   </span>
//                   {/* Add dropdown menu for Wooden Flooring */}
//                   {item === "Wooden Flooring" && (
//                     <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
//                       {subcategoriesForWoodenFloorings.map((subcat) => (
//                         <button
//                           key={subcat._id}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             router.push(
//                               `/category/wooden flooring/${subcat.name}`
//                             );
//                           }}
//                           className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
//                         >
//                           {subcat.name}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                   {item === "Wallpaper" && (
//                     <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
//                       {subcategoriesWallpaper.map((subcat) => (
//                         <button
//                           key={subcat._id}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             router.push(`/category/wallpaper/${subcat.name}`);
//                           }}
//                           className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
//                         >
//                           {subcat.name}
//                         </button>
//                       ))}
//                     </div>
//                   )}

//                   <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu - Updated styles */}
//       <div
//         className={`mobile-menu-container md:hidden bg-[#012b5b] border-t border-gray-700 ${
//           isMobileMenuOpen ? "block" : "hidden"
//         }`}
//       >
//         <div className="px-4 py-3 space-y-4">
//           <div className="md:hidden flex-1 max-w-2xl mx-auto">
//             <div className="relative group">
//               {/* // Modify the search input to prevent immediate state changes */}
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setSearchQuery(value);
//                 }}
//                 onFocus={() => {
//                   if (searchQuery.trim() !== "") {
//                     setShowSearchResults(true);
//                   }
//                 }}
//                 placeholder="Search for wallpapers, floorings, and more..."
//                 className="w-full pl-12 pr-4 py-1 rounded-full border border-gray-400 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30"
//               />
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

//               {/* Search Results - Updated styles */}
//               {showSearchResults && searchQuery && (
//                 <div className="absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-[60]">
//                   {products.length > 0 ? (
//                     <div className="max-h-[300px] overflow-y-auto bg-white">
//                       {products.map((product, index) => (
//                         <button
//                           key={`${product._id || product.id || index}`}
//                           onClick={() => {
//                             router.push(
//                               `/products/${
//                                 product.type == "wallpaper"
//                                   ? "wallpapers"
//                                   : "wooden-flooring"
//                               }/${product.id}`
//                             );
//                             setSearchQuery("");
//                             setShowSearchResults(false);
//                           }}
//                           className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between group bg-white"
//                         >
//                           <span>{product.name}</span>
//                           <span className="text-sm text-gray-500 group-hover:text-[#012b5b]">
//                             {product.category}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="px-4 py-3 text-gray-600 text-center bg-white">
//                       No products found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col space-y-2">
//             {menuItems.map((item) => {
//               const path = `/category/${item.toLowerCase()}`;
//               const isActive = pathname.startsWith(path);
//               const isDropdown =
//                 item === "Wooden Flooring" || item === "Wallpaper";
//               const dropdownKey = item.toLowerCase().replace(" ", "");

//               return (
//                 <div key={item} className="relative">
//                   <button
//                     onClick={() => {
//                       if (isDropdown) {
//                         toggleMobileDropdown(dropdownKey);
//                       } else {
//                         router.push(
//                           path + (path !== "/category/acoustics" ? "/All" : "")
//                         );
//                         setIsMobileMenuOpen(false);
//                       }
//                     }}
//                     className={`flex items-center justify-between w-full p-3 rounded-lg ${
//                       isActive
//                         ? "bg-[#283593] text-white"
//                         : "text-gray-200 hover:bg-[#283593] hover:text-white"
//                     }`}
//                   >
//                     <span>{item}</span>
//                     {isDropdown && (
//                       <FaChevronDown
//                         className={`transition-transform ${
//                           mobileMenuDropdowns[dropdownKey] ? "rotate-180" : ""
//                         }`}
//                       />
//                     )}
//                   </button>

//                   {/* Dropdown for Wooden Flooring */}
//                   {item === "Wooden Flooring" &&
//                     mobileMenuDropdowns.woodenflooring && (
//                       <div className="ml-4 mt-1 space-y-1">
//                         {subcategoriesForWoodenFloorings.map((subcat) => (
//                           <button
//                             key={subcat._id}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               router.push(
//                                 `/category/wooden flooring/${subcat.name}`
//                               );
//                               setIsMobileMenuOpen(false);
//                             }}
//                             className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-[#283593]/50 hover:text-white rounded-lg"
//                           >
//                             {subcat.name}
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {/* Dropdown for Wallpaper */}
//                   {item === "Wallpaper" && mobileMenuDropdowns.wallpaper && (
//                     <div className="ml-4 mt-1 space-y-1">
//                       {subcategoriesWallpaper.map((subcat) => (
//                         <button
//                           key={subcat._id}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             router.push(`/category/wallpaper/${subcat.name}`);
//                             setIsMobileMenuOpen(false);
//                           }}
//                           className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-[#283593]/50 hover:text-white rounded-lg"
//                         >
//                           {subcat.name}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#283593]">
//             <button
//               onClick={handleSignIn}
//               className="flex flex-col items-center space-y-1 p-3 text-gray-200 hover:bg-[#283593] rounded-lg"
//             >
//               <FaUser />
//               <span className="text-sm">Account</span>
//             </button>
//             <button
//               onClick={() => router.push("/profile?to=3")}
//               className="flex flex-col text-gray-200 items-center space-y-1 p-3 hover:bg-[#283593] rounded-lg"
//             >
//               {/* <Image
//                 src="/moodboard.png"
//                 alt="moodboard icon"
//                 width={16}
//                 height={16}
//               /> */}
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect
//                   x="3"
//                   y="3"
//                   width="7"
//                   height="7"
//                   rx="1"
//                   stroke="white"
//                   stroke-width="2"
//                 />
//                 <rect
//                   x="14"
//                   y="3"
//                   width="7"
//                   height="7"
//                   rx="1"
//                   stroke="white"
//                   stroke-width="2"
//                 />
//                 <rect
//                   x="3"
//                   y="14"
//                   width="7"
//                   height="7"
//                   rx="1"
//                   stroke="white"
//                   stroke-width="2"
//                 />
//                 <path
//                   d="M15 14.5C15 13.6716 15.6716 13 16.5 13C17.3284 13 18 13.6716 18 14.5C18 15.3284 17.3284 16 16.5 16C15.6716 16 15 15.3284 15 14.5Z"
//                   fill="white"
//                 />
//                 <path
//                   d="M13.5 18C13.5 16.6193 14.6193 15.5 16 15.5C17.3807 15.5 18.5 16.6193 18.5 18V19H13.5V18Z"
//                   fill="white"
//                 />
//               </svg>

//               <span className="text-sm">Mood board</span>
//             </button>
//             <button
//               onClick={() => router.push("/cart")}
//               className="flex flex-col items-center text-gray-200 space-y-1 p-3 hover:bg-[#283593] rounded-lg"
//             >
//               <FaCartPlus />
//               <span className="text-sm">Cart</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Location Modal */}
//       {showLocationModal && (
//         <LocationModal
//           onClose={() => setShowLocationModal(false)}
//           onSelectLocation={(location, pincode) => {
//             setSelectedLocation(location);
//             setSelectedPincode(pincode);
//             setShowLocationModal(false);
//           }}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaStore,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaCartPlus,
  FaHeart,
} from "react-icons/fa";
import LocationModal from "./LocationModal";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/AxiosInstance";
import { login } from "@/store/userSlice";
import { X } from "lucide-react";
import { removeFromMoodboard } from "@/store/moodboardSlice";

const Navbar = () => {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Mumbai");
  const [selectedPincode, setSelectedPincode] = useState("400017");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [subcategoriesForWoodenFloorings, setSubcategoriesForWoodenFloorings] =
    useState([]);
  const [subcategoriesWallpaper, setSubcategoriesWallpaper] = useState([]);
  const [products, setProducts] = useState([]);
  const [mobileMenuDropdowns, setMobileMenuDropdowns] = useState({
    woodenFlooring: false,
    wallpaper: false,
  });
  const [showGuestMoodboard, setShowGuestMoodboard] = useState(false);
  const guestMoodboard = useSelector((state) => state.moodboard);
  const [token, setToken] = useState("");
  const modalRef = useRef();

  // Other hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.user.isAuthenticated);
  const isHomePage = pathname === "/";

  // Menu items
  const menuItems = ["Wallpaper", "Wooden Flooring", "Acoustics"];

  // Async functions
  const fetchWoodenFloorCategories = async () => {
    try {
      const res = await axiosInstance.get("/wooden-floors/getCategories");
      if (res.status === 200) {
        setSubcategoriesForWoodenFloorings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWallpaperCategories = async () => {
    try {
      const res = await axiosInstance.get("/wallpapers/getCategories");
      if (res.status === 200) {
        setSubcategoriesWallpaper(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setShowSearchResults(false);
      const res = await axiosInstance.get(
        `/user/search-products?search=${searchQuery}`
      );
      if (res.status === 200) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
    setShowSearchResults(true);
  };

  const handleSignIn = () => {
    if (islogin) {
      router.push("/profile");
      return;
    }
    router.push("/login");
  };

  const toggleMobileDropdown = (menu) => {
    setMobileMenuDropdowns((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Effect hooks
  useEffect(() => {
    fetchWoodenFloorCategories();
    fetchWallpaperCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenu = document.querySelector(".mobile-menu-container");
      if (isMobileMenuOpen && mobileMenu && !mobileMenu.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    if (token) {
      dispatch(login({ token, name, email }));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timer = setTimeout(() => {
        fetchProducts();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setProducts([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryLocation");
    if (savedLocation) {
      try {
        const { name, pincode } = JSON.parse(savedLocation);
        setSelectedLocation(name);
        setSelectedPincode(pincode);
      } catch (e) {
        console.error("Error parsing saved location:", e);
      }
    }
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showGuestMoodboard &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowGuestMoodboard(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showGuestMoodboard]);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isHomePage && !isScrolled
          ? "bg-transparent backdrop-blur-md"
          : "bg-[#012b5b] shadow-lg" // Navy blue background
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Top navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Location */}
          <div className="flex items-center space-x-8">
            <div
              className="text-2xl font-bold text-white cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push("/")}
            >
              Zendor
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="hidden md:flex items-center space-x-1 text-white/90 hover:text-white transition-colors group"
            >
              <FaMapMarkerAlt className="text-white" />
              <div className="text-left">
                <p className="text-xs text-white/80">Deliver to</p>
                <p className="font-medium text-sm">
                  {selectedLocation} {selectedPincode}
                </p>
              </div>
            </button>
          </div>

          {/* Centered Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.trim() !== "" && setShowSearchResults(true)
                }
                placeholder="Search wallpapers, flooring, acoustics..."
                className="w-full pl-12 pr-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />

              {/* Search Results */}
              {showSearchResults && searchQuery && (
                <div className="absolute mt-1 w-full bg-white rounded-lg shadow-xl border border-[#E0E0E0] overflow-hidden z-50">
                  {products.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto">
                      {products.map((product, index) => (
                        <button
                          key={`${product._id || product.id || index}`}
                          onClick={() => {
                            router.push(
                              `/products/${
                                product.type === "wallpaper"
                                  ? "wallpapers"
                                  : "wooden-flooring"
                              }/${product.id}`
                            );
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full cursor-pointer px-4 py-3 text-left text-black hover:bg-[#FAFAFA] flex items-center border-b border-[#F5F5F5]"
                        >
                          <span className="truncate flex-1">
                            {product.name}
                          </span>
                          <span className="text-xs text-[#ebb207] ml-2  px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-[#9E9E9E] text-center">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => router.push("/visit-store")}
              className="flex items-center cursor-pointer space-x-2 text-white/90 hover:text-white transition-colors group"
            >
              <div className="relative">
                <FaStore className="text-lg" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
              </div>
              <span className="text-sm font-medium"> Visit Store</span>
            </button>

            <div className="flex items-center space-x-2">
              {[
                { icon: FaUser, onClick: handleSignIn, name: "Account" },
                {
                  icon: FaHeart,
                  onClick: () => {
                    if (!localStorage.getItem("token")) {
                      setShowGuestMoodboard(true);
                    } else {
                      router.push("/profile?to=3");
                    }
                  },
                  customIcon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        rx="1"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M15 14.5C15 13.6716 15.6716 13 16.5 13C17.3284 13 18 13.6716 18 14.5C18 15.3284 17.3284 16 16.5 16C15.6716 16 15 15.3284 15 14.5Z"
                        fill="white"
                      />
                      <path
                        d="M13.5 18C13.5 16.6193 14.6193 15.5 16 15.5C17.3807 15.5 18.5 16.6193 18.5 18V19H13.5V18Z"
                        fill="white"
                      />
                    </svg>
                  ),
                  name: "Moodboard",
                },
                {
                  icon: FaCartPlus,
                  onClick: () => router.push("/cart"),
                  name: "Cart",
                },
              ].map((item, index) => (
                <button
                  key={`nav-icon-${index}`}
                  onClick={item.onClick}
                  className="flex flex-row cursor-pointer items-center p-2 group relative"
                >
                  <div className="p-1.5 rounded-full group-hover:bg-white/10 transition-colors">
                    {item.customIcon || (
                      <item.icon className="text-white group-hover:text-white" />
                    )}
                  </div>
                  <span className="text-xs text-white/80 group-hover:text-white mt-1">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white/80"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Categories Menu */}
        <div className="hidden md:flex justify-center border-t border-white/10">
          <div className="flex space-x-1 py-2">
            <button
              onClick={() => router.push("/products/explore")}
              className="px-4 py-2  cursor-pointer text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Explore All
            </button>

            {menuItems.map((item) => {
              const path = `/category/${item.toLowerCase()}`;
              const isActive = pathname.startsWith(path);
              return (
                <div key={item} className="relative group">
                  <button
                    onClick={() =>
                      router.push(
                        path + (path !== "/category/acoustics" ? "/All" : "")
                      )
                    }
                    className={`px-4  cursor-pointer py-2 text-sm font-medium flex items-center ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item}
                    {(item === "Wooden Flooring" || item === "Wallpaper") && (
                      <FaChevronDown className="ml-1 text-xs opacity-70 group-hover:opacity-100" />
                    )}
                  </button>

                  {/* Dropdown menus */}
                  {(item === "Wooden Flooring" || item === "Wallpaper") && (
                    <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-[#E0E0E0] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {(item === "Wooden Flooring"
                        ? subcategoriesForWoodenFloorings
                        : subcategoriesWallpaper
                      ).map((subcat) => (
                        <button
                          key={subcat._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/category/${item
                                .toLowerCase()}/${subcat.name}`
                            );
                          }}
                          className="block cursor-pointer w-full text-left px-4 py-2.5 text-sm text-[#4D4D4D] hover:bg-[#FAFAFA] border-b border-[#F5F5F5] last:border-0"
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#012b5b] shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 py-3 space-y-4 border-t border-white/10">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() =>
                searchQuery.trim() !== "" && setShowSearchResults(true)
              }
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/60"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
          </div>

          {/* Mobile Menu Items */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const dropdownKey = item.toLowerCase().replace(" ", "");
              return (
                <div
                  key={item}
                  className="border-b border-white/10 last:border-0"
                >
                  <button
                    onClick={() => {
                      if (item === "Wooden Flooring" || item === "Wallpaper") {
                        toggleMobileDropdown(dropdownKey);
                      } else {
                        router.push(`/category/${item.toLowerCase()}`);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="w-full flex justify-between items-center py-3 px-2 text-white hover:bg-white/10 rounded-lg"
                  >
                    <span>{item}</span>
                    {(item === "Wooden Flooring" || item === "Wallpaper") && (
                      <FaChevronDown
                        className={`transition-transform ${
                          mobileMenuDropdowns[dropdownKey] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown Content */}
                  {(item === "Wooden Flooring" || item === "Wallpaper") &&
                    mobileMenuDropdowns[dropdownKey] && (
                      <div className="ml-4 pl-2 border-l-2 border-white/20 space-y-1">
                        {(item === "Wooden Flooring"
                          ? subcategoriesForWoodenFloorings
                          : subcategoriesWallpaper
                        ).map((subcat) => (
                          <button
                            key={subcat._id}
                            onClick={() => {
                              router.push(
                                `/category/${item
                                  .toLowerCase()}/${subcat.name}`
                              );
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left py-2 px-2 text-sm text-white/90 hover:bg-white/10 rounded"
                          >
                            {subcat.name}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setShowLocationModal(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center p-2 text-white/90 hover:text-white rounded-lg"
            >
              <FaMapMarkerAlt />
              <span className="text-xs mt-1">Location</span>
            </button>
            <button
              onClick={() => {
                router.push("/visit-store");
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center p-2 text-white/90 hover:text-white rounded-lg"
            >
              <FaStore />
              <span className="text-xs mt-1">Stores</span>
            </button>
            <button
              onClick={() => {
                handleSignIn();
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center p-2 text-white/90 hover:text-white rounded-lg"
            >
              <FaUser />
              <span className="text-xs mt-1">Account</span>
            </button>
            <button
              onClick={() => {
                router.push("/cart");
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-center p-2 text-white/90 hover:text-white rounded-lg"
            >
              <FaCartPlus />
              <span className="text-xs mt-1">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Location Modal (unchanged) */}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={(location, pincode) => {
            setSelectedLocation(location);
            setSelectedPincode(pincode);
            setShowLocationModal(false);
          }}
        />
      )}

      {/* Guest Moodboard Modal */}
      {showGuestMoodboard && (
        <div className="fixed inset-0 z-[999] flex justify-end bg-black/30">
          <div
            ref={modalRef}
            className="w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col relative animate-slide-in-right"
          >
            <button
              onClick={() => setShowGuestMoodboard(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Moodboard:{" "}
              <span className="text-[#f5b142]">guest</span>
            </h2>
            {guestMoodboard.items && guestMoodboard.items.length > 0 ? (
              <div className="flex-1 overflow-y-auto space-y-4">
                {guestMoodboard.items.map((item) => (
                  <div
                    key={item.id || item._id || Math.random()}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <button
                        onClick={() => dispatch(removeFromMoodboard(item.id))}
                        className="text-xs text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 mt-8">Your Moodboard is empty.</div>
            )}
          </div>
          {/* Clickable overlay to close */}
          <div
            className="flex-1"
            onClick={() => setShowGuestMoodboard(false)}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
