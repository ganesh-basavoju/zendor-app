"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Tag, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/AxiosInstance";
import Carousal from "@/components/Global/Carousal";

export default function ExplorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState("Featured");

  console.log(products);
  // Fetch all products from both wallpapers and wooden floors
  // Modify fetchProducts function to handle unified sorting
  const fetchProducts = async (page = 1) => {
    try {
      setIsLoading(true);
      
      // Get both wallpapers and wooden floors
      const [wallpaperRes, woodenFloorRes] = await Promise.all([
        axiosInstance.get(
          `/wallpapers/products?page=${page}&limit=6&search=${searchQuery}${selectedCategory !== "All" ? `&subCategory=${selectedCategory}` : ""}`
        ),
        axiosInstance.get(
          `/wooden-floors/products?page=${page}&limit=6&search=${searchQuery}${selectedCategory !== "All" ? `&subCategory=${selectedCategory}` : ""}`
        ),
      ]);

      let wallpapers = wallpaperRes.data.data.map((product) => ({
        ...product,
        category: "Wallpaper",
        type: "wallpaper",
      }));

      let woodenFloors = woodenFloorRes.data.data.map((product) => ({
        ...product,
        category: "Wooden Flooring",
        type: "wooden-flooring",
      }));

      // Combine and sort all products
      let allProducts = [...wallpapers, ...woodenFloors];
      
      // Apply unified sorting
      if (sortBy === "Price: Low to High") {
        allProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "Price: High to Low") {
        allProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "Newest First") {
        allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setProducts(allProducts);
      setTotalProducts(wallpaperRes.data.total + woodenFloorRes.data.total);
      setTotalPages(Math.ceil((wallpaperRes.data.total + woodenFloorRes.data.total) / 12));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add hierarchical category state
  const [mainCategory, setMainCategory] = useState("All");
  const [subCategories, setSubCategories] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Modify fetchCategories to handle hierarchical structure
  const fetchCategories = async () => {
    try {
      const [wallpaperCats, woodenFloorCats] = await Promise.all([
        axiosInstance.get("/wallpapers/getCategories"),
        axiosInstance.get("/wooden-floors/getCategories")
      ]);
  
      // Convert to array format
      const categories = [
        ...wallpaperCats.data.data.map(cat => cat.name),
        ...woodenFloorCats.data.data.map(cat => cat.name)
      ];
  
      setCategories(categories);

      // Fetch colors for wallpapers
      if (mainCategory === "Wallpapers") {
        const colorsRes = await axiosInstance.get("/wallpapers/getColors");
        setAvailableColors(colorsRes.data.colors || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Reset to empty array on error
    }
  };

  // Add color filter component
  const ColorFilter = () => (
    mainCategory === "Wallpapers" && (
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Color</h3>
        <div className="grid grid-cols-4 gap-3">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorToggle(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color)
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        {selectedColors.length > 0 && (
          <button
            onClick={() => setSelectedColors([])}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Clear colors
          </button>
        )}
      </div>
    )
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [searchQuery, selectedCategory, sortBy, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const handleProductClick = (product) => {
    if (product.type === "wallpaper") {
      router.push(`/products/wallpapers/${product.id}`);
    } else {
      router.push(`/products/wooden-flooring/${product.id}`);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Pagination component
  const PaginationComponent = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              currentPage === page
                ? "text-white bg-blue-600 border border-blue-600"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-2">
      {/* Header */}
      <div className="bg-white shadow-md backdrop-blur-sm">
        <div className="max-w-8xl mx-auto  py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-blue-900 tracking-tight">
            Discover Our Premium Products
          </h1>
          <p className="mt-2 text-gray-600">
            Find what you love from our collection
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-8xl mx-auto px-2 sm:px-6 py-8">
        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 w-full lg:w-80 rounded-lg bg-white p-3 shadow-sm">
          <div className="relative mb-6 flex">
            <Search className="absolute left-3 top-1 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest First">Newest First</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Categories
            </h3>
            {["All", ...categories].map((category) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#4A90E2] text-white shadow-lg shadow-[#4A90E2]/30"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results summary */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {(currentPage - 1) * 12 + 1}-
            {Math.min(currentPage * 12, totalProducts)} of {totalProducts}{" "}
            products
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    key={`${product.id}-${index}`}
                    onClick={() => handleProductClick(product)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-w-3 aspect-h-2 overflow-hidden rounded-t-xl">
                      {product.category === "Wallpaper" ? (
                        <div className="w-full h-[300px]">
                        <Carousal
                          images={product.colors?.map((item) => item.pic)}
                        />
                        </div>
                      ) : (
                        <img
                          src={
                            product.image ||
                            (product.colors && product.colors[0]?.pic)
                          }
                          alt={product.name}
                          className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.category}
                          </p>
                          <p className="text-sm text-gray-400">
                            {product.brand}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ₹{product.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                      {product.category === "Wallpaper" && product.colors && (
                        <div className="flex gap-2 flex-wrap mt-2">
                          {product.colors
                            .slice(0, 5)
                            .map((color, colorIndex) => (
                              <div
                                key={colorIndex}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: color.color }}
                              />
                            ))}
                          {product.colors.length > 5 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                              <span className="text-xs text-gray-600 font-medium">
                                +{product.colors.length - 5}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced No Results Message */}
              {products.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 bg-white rounded-xl shadow-sm p-8"
                >
                  <h3 className="text-xl font-medium text-gray-900">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && <PaginationComponent />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
