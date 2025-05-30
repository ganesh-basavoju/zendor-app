"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";

const Navbar = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Mumbai");
  const [selectedPincode, setSelectedPincode] = useState("400017");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [subcategoriesForWoodenFloorings, setSubcategoriesForWoodenFloorings] =
    useState([]);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const islogin = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [subcategoriesWallpaper, setSubcategoriesWallpaper] = useState([]);

  const fetchWoodenFloorCategories = async () => {
    try {
      const res = await axiosInstance.get("/wooden-floors/getCategories");
      if (res.status === 200) {
        setSubcategoriesForWoodenFloorings(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWallpaperCategories = async () => {
    try {
      const url = "/wallpapers/getCategories";
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        setSubcategoriesWallpaper(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //  const [loading,setLoading]=useState(false);

  //  const [loading,setLoading]=useState(false);
  useEffect(() => {
    fetchWoodenFloorCategories();
    fetchWallpaperCategories();
    // fetchProducts();
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

  // Add useEffect for window-dependent initialization
  useEffect(() => {
    // Initialize any window-dependent states here
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    if (token) {
      dispatch(login({ token, name, email }));
    }
  }, []); // Empty dependency array for initialization
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample products data for search functionality
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      setShowSearchResults(false);
      const res = await axiosInstance.get(
        `/user/search-products?search=${searchQuery}`
      );
      if (res.status === 200) {
        console.log("data", res.data);
        const data = res.data;
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
      setProducts([]); // Reset products on error
    }
    setShowSearchResults(true);
  };

  // Move the useEffect for search outside of render
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timer = setTimeout(() => {
        fetchProducts();
        setShowSearchResults(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setProducts([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const router = useRouter();

  // Add menuItems array
  const menuItems = ["Wallpaper", "Wooden Flooring", "Acoustics"];

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSearchResults(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Don't render navbar if we're in an admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSignIn = () => {
    if (islogin) {
      router.push("/profile");
      return;
    }
    // Toggle the login modal or navigate to login page
    router.push("/login");
  };

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isHomePage && !isScrolled
          ? "bg-transparent backdrop-blur-md"
          : "bg-[#012b5b] shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Top navbar */}
        <div className="flex items-center justify-between gap-4 py-1">
          {/* Logo and Location */}
          <div className="flex items-center space-x-6 min-w-[200px]">
            <div
              className="text-2xl font-bold text-white cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push("/")}
            >
              Zendor
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="hidden md:flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
            >
              <FaMapMarkerAlt className="text-white" />
              <span className="font-medium">{selectedLocation}</span>
              <span className="text-gray-300">{selectedPincode}</span>
            </button>
          </div>

          {/* Centered Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-auto">
            <div className="relative group">
              {/* // Modify the search input to prevent immediate state changes */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                }}
                onFocus={() => {
                  if (searchQuery.trim() !== "") {
                    setShowSearchResults(true);
                  }
                }}
                placeholder="Search for wallpapers, floorings, and more..."
                className="w-full pl-12 pr-4 py-1 rounded-full border border-gray-400 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

              {/* Search Results - Updated styles */}
              {showSearchResults && searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-[60]">
                  {products.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto bg-white">
                      {products.map((product, index) => (
                        <button
                          key={`${product._id || product.id || index}`}
                          onClick={() => {
                            router.push(
                              `/products/${
                                product.type == "wallpaper"
                                  ? "wallpapers"
                                  : "wooden-flooring"
                              }/${product.id}`
                            );
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between group bg-white"
                        >
                          <span>{product.name}</span>
                          <span className="text-sm text-gray-500 group-hover:text-[#012b5b]">
                            {product.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-gray-600 text-center bg-white">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-6 min-w-[200px] justify-end text-white">
            <button
              onClick={() => router.push("/visit-store")}
              className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
            >
              <FaStore />
              <span>Visit Store</span>
            </button>

            <div className="flex items-center space-x-4">
              {[
                { icon: FaUser, onClick: handleSignIn },
                {
                  icon: FaHeart,
                  name: "moodboard",
                  onClick: () => router.push("/profile?to=3"),
                },
                { icon: FaCartPlus, onClick: () => router.push("/cart") },
              ].map((item, index) => (
                <button
                  key={`nav-icon-${index}`}
                  onClick={item.onClick}
                  className="p-2.5 cursor-pointer hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  {item?.name === "moodboard" ? (
                    <Image
                      src="/moodboard.png"
                      alt="moodboard icon"
                      width={22}
                      height={22}
                    />
                  ) : (
                    <item.icon className="text-xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 hover:bg-white/30 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Categories Menu - Updated styles */}
        <div className="hidden md:flex justify-center mt-1 border-t border-white/10 pt-2">
          <div className="flex space-x-8 items-center">
            {menuItems.map((item) => {
              const path = `/category/${item.toLowerCase()}`;
              const isActive = pathname.startsWith(path);
              return (
                <button
                  key={item}
                  onClick={() => {
                    if (path !== "/category/acoustics") {
                      router.push(path + "/All");
                    } else {
                      router.push(path);
                    }
                  }}
                  className={`group relative px-3 py-2 transition-colors ${
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    {item}
                    <FaChevronDown
                      className={`ml-1 transition-transform group-hover:rotate-180`}
                    />
                  </span>
                  {/* Add dropdown menu for Wooden Flooring */}
                  {item === "Wooden Flooring" && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {subcategoriesForWoodenFloorings.map((subcat) => (
                        <button
                          key={subcat._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/category/wooden flooring/${subcat.name}`
                            );
                          }}
                          className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  )}
                  {item === "Wallpaper" && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {subcategoriesWallpaper.map((subcat) => (
                        <button
                          key={subcat._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/category/wallpaper/${subcat.name}`);
                          }}
                          className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Updated styles */}
      <div
        className={`mobile-menu-container md:hidden bg-[#012b5b] border-t border-gray-700 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-4">
      
          <div className="md:hidden flex-1 max-w-2xl mx-auto">
            <div className="relative group">
              {/* // Modify the search input to prevent immediate state changes */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                }}
                onFocus={() => {
                  if (searchQuery.trim() !== "") {
                    setShowSearchResults(true);
                  }
                }}
                placeholder="Search for wallpapers, floorings, and more..."
                className="w-full pl-12 pr-4 py-1 rounded-full border border-gray-400 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

              {/* Search Results - Updated styles */}
              {showSearchResults && searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-xl overflow-hidden z-[60]">
                  {products.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto bg-white">
                      {products.map((product, index) => (
                        <button
                          key={`${product._id || product.id || index}`}
                          onClick={() => {
                            router.push(
                              `/products/${
                                product.type == "wallpaper"
                                  ? "wallpapers"
                                  : "wooden-flooring"
                              }/${product.id}`
                            );
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between group bg-white"
                        >
                          <span>{product.name}</span>
                          <span className="text-sm text-gray-500 group-hover:text-[#012b5b]">
                            {product.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-gray-600 text-center bg-white">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const path = `/category/${item.toLowerCase()}`;
              const isActive = pathname.startsWith(path);
              const [isOpen, setIsOpen] = useState(false);

              return (
                <div key={item} className="relative">
                  <button
                    onClick={() => {
                      if (item === "Wooden Flooring" || item === "Wallpaper") {
                        setIsOpen(!isOpen);
                      } else {
                        router.push(
                          path + (path !== "/category/acoustics" ? "/All" : "")
                        );
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between w-full p-3 rounded-lg ${
                      isActive
                        ? "bg-[#283593] text-white"
                        : "text-gray-200 hover:bg-[#283593] hover:text-white"
                    }`}
                  >
                    <span>{item}</span>
                    <FaChevronDown
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      } ${
                        item === "Wooden Flooring" || item === "Wallpaper"
                          ? ""
                          : "opacity-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown for Wooden Flooring */}
                  {item === "Wooden Flooring" && isOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {subcategoriesForWoodenFloorings.map((subcat) => (
                        <button
                          key={subcat._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/category/wooden flooring/${subcat.name}`
                            );
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-[#283593]/50 hover:text-white rounded-lg"
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Dropdown for Wallpaper */}
                  {item === "Wallpaper" && isOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {subcategoriesWallpaper.map((subcat) => (
                        <button
                          key={subcat._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/category/wallpaper/${subcat.name}`);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-[#283593]/50 hover:text-white rounded-lg"
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

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#283593]">
            <button
              onClick={handleSignIn}
              className="flex flex-col items-center space-y-1 p-3 text-gray-200 hover:bg-[#283593] rounded-lg"
            >
              <FaUser />
              <span className="text-sm">Account</span>
            </button>
            <button
              onClick={() => router.push("/profile?to=3")}
              className="flex flex-col text-gray-200 items-center space-y-1 p-3 hover:bg-[#283593] rounded-lg"
            >
              <Image
                src="/moodboard.png"
                alt="moodboard icon"
                width={16}
                height={16}
              />

              <span className="text-sm">Mood board</span>
            </button>
            <button
              onClick={() => router.push("/cart")}
              className="flex flex-col items-center text-gray-200 space-y-1 p-3 hover:bg-[#283593] rounded-lg"
            >
              <FaCartPlus />
              <span className="text-sm">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Location Modal */}
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
    </nav>
  );
};

export default Navbar;
