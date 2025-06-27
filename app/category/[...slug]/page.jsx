"use client";
import Image from "next/image";
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Filter,
  Heart,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/AxiosInstance";
import { use } from "react";
import toast, { Toaster } from "react-hot-toast";
import Carousal from "@/components/Global/Carousal";

export default function CategoryPage({ params }) {
  const router = useRouter();

  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const slug = decodeURIComponent(unwrappedParams.slug[0]);
  const subCat = decodeURIComponent(unwrappedParams.slug[1]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const { ref, inView } = useInView();
  const [subcategories, setSubcategories] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(0);

  // Mobile filter sidebar state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Additional filter states
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [priceSort, setPriceSort] = useState("");
  const [availableColors, setAvailableColors] = useState([]);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [collections, setCollections] = useState([]);

  const handleHeartClick = (e, product) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add to MoodBoard");
      router.push("/login");
      return;
    }
    setSelectedProduct(product);
    setShowCollectionModal(true);
  };

  const handleAddToCollection = async (name) => {
    try {
      const response = await axiosInstance.post("user/add-to-moodBoard", {
        productId: selectedProduct,
        productType: slug === "wallpaper" ? "Wallpaper" : "WoodenFloor",
        name: name,
      });
      if (response.status === 200) {
        toast.success("Added to MoodBoard Collection");
      } else {
        toast.error("Failed to add into collection");
      }
      setShowCollectionModal(false);
    } catch (error) {
      console.error("Error adding to collection:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", 1);
      params.append("limit", 10);
      if (selectedSubcategory)
        params.append("subCategory", selectedSubcategory);
      if (searchQuery) params.append("search", searchQuery);
      if (selectedColors.length > 0)
        params.append("colors", selectedColors.join(","));
      if (sortBy) params.append("sortBy", sortBy);
      if (priceRange.min !== undefined)
        params.append("minPrice", priceRange.min);
      if (priceRange.max !== undefined)
        params.append("maxPrice", priceRange.max);
      if (priceSort) params.append("priceSort", priceSort);

      const url =
        slug === "wallpaper"
          ? `/wallpapers/products?${params.toString()}`
          : `/wooden-floors/products?${params.toString()}`;
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        const { totalPages, currentPage, data } = res.data;
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  console.log("products", products);

  const fetchMoodBoards = useCallback(async () => {
    try {
      const response = await axiosInstance.get("user/get-moodBoard");
      if (response.data.success) {
        const fetchedProjects = response.data.data.map((moodBoard, index) => ({
          id: index,
          name: moodBoard.name,
          address: moodBoard.address,
          products: [],
          createdAt: new Date().toISOString(),
        }));
        setCollections(fetchedProjects);
      }
    } catch (error) {
      console.error("Error fetching moodboards:", error);
    }
  }, []);

  useEffect(() => {
    fetchMoodBoards();
  }, []);

  const handleSearch = (e) => {
    setCurrentPage(0);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (subCat) {
      setSelectedSubcategory(subCat);
    }
  }, [subCat]);

  const loadMoreProducts = async () => {
    if (CurrentPage < TotalPages) {
      setLoading(true);
      try {
        const nextPage = CurrentPage + 1;

        const params = new URLSearchParams();
        params.append("page", nextPage);
        params.append("limit", 10);
        if (selectedSubcategory)
          params.append("subCategory", selectedSubcategory);
        if (searchQuery) params.append("search", searchQuery);
        if (sortBy) params.append("sortBy", sortBy);
        if (slug === "wallpaper" && selectedColors.length > 0) {
          params.append("colors", selectedColors.join(","));
        }
        if (priceRange.min !== undefined)
          params.append("minPrice", priceRange.min);
        if (priceRange.max !== undefined)
          params.append("maxPrice", priceRange.max);
        if (priceSort) params.append("priceSort", priceSort);

        const url =
          slug === "wallpaper"
            ? `/wallpapers/products?${params.toString()}`
            : `/wooden-floors/products?${params.toString()}`;

        const res = await axiosInstance.get(url);
        if (res.status === 200) {
          const { totalPages, currentPage, data } = res.data;
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    selectedSubcategory,
    searchQuery,
    selectedColors,
    priceRange,
    priceSort,
    sortBy,
  ]);

  useEffect(() => {
    if (inView && !loading && CurrentPage < TotalPages) {
      loadMoreProducts();
    }
  }, [inView, loading, CurrentPage, TotalPages]);

  const handleProductClick = (productId) => {
    if (slug === "wallpaper") {
      router.push(`/products/wallpapers/${productId}`);
    } else if (slug === "wooden flooring") {
      router.push(`/products/wooden-flooring/${productId}`);
    }
  };

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axiosInstance.get("/wallpapers/getColors");
        if (res.status === 200) {
          setAvailableColors(res.data.colors);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (slug === "wallpaper") {
      fetchColors();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const url =
        slug === "wallpaper"
          ? "/wallpapers/getCategories"
          : "/wooden-floors/getCategories";
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        setSubcategories(res.data.data);

        // Extract unique colors for wallpapers
        if (slug === "wallpaper" && res.data.colors) {
          setAvailableColors(res.data.colors);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubcategoryChange = (subcatName) => {
    setCurrentPage(0);
    setSelectedSubcategory(
      selectedSubcategory === subcatName ? "All" : subcatName
    );
    setShowMobileFilters(false);
  };

  const handleColorToggle = (color) => {
    setCurrentPage(0);
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handlePriceRangeChange = (field, value) => {
    setCurrentPage(0);
    setPriceRange((prev) => ({ ...prev, [field]: value }));
  };

  const handlePriceSortChange = (sort) => {
    setCurrentPage(0);
    setPriceSort(sort);
  };

  const clearAllFilters = () => {
    setCurrentPage(0);
    setSelectedSubcategory("All");
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 10000 });
    setPriceSort("");
  };

  // Filter Sidebar Component
  const FilterSidebar = ({ className = "" }) => (
    <div className={`bg-white min-h-full  ${className}`}>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setShowMobileFilters(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Shop by Category
          </h2>
        </div>

        {/* Categories Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 md:hidden">
            Categories
          </h3>
          <div className="space-y-3">
            {subcategories.map((subcat) => (
              <div key={subcat.name} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={subcat.name}
                  checked={selectedSubcategory === subcat.name}
                  onChange={() => handleSubcategoryChange(subcat.name)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor={subcat.name}
                  className="text-gray-700 cursor-pointer flex-1 text-sm hover:text-gray-900 transition-colors"
                >
                  {subcat.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Color Filter for Wallpapers */}
        {slug === "wallpaper" && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Filter by Color
            </h3>
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
        )}

        {/* Price Filter */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <label className="text-xs text-gray-600 block mb-1">
                  Min Price
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  value={priceRange.min}
                  onChange={(e) =>
                    handlePriceRangeChange("min", e.target.value)
                  }
                  className="w-full cursor-pointer"
                  key={`${slug}-min`}
                />
                <span className="text-xs text-gray-600">₹{priceRange.min}</span>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600 block mb-1">
                  Max Price
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  value={priceRange.max}
                  onChange={(e) =>
                    handlePriceRangeChange("max", e.target.value)
                  }
                  className="w-full cursor-pointer"
                  key={`${slug}-max`}
                />
                <span className="text-xs text-gray-600">₹{priceRange.max}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium py-2   text-gray-600">
                Sort by Price
              </label>
              <div className="space-y-2">
                {[
                  { value: "low-to-high", label: "Low to High" },
                  { value: "high-to-low", label: "High to Low" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={option.value}
                      name="priceSort"
                      checked={priceSort === option.value}
                      onChange={() => {
                        if (priceSort === option.value) {
                          handlePriceSortChange("");
                          return;
                        }
                        handlePriceSortChange(option.value);
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={option.value}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clear All Filters */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );

  if (slug === "wallpaper" || slug === "wooden flooring") {
    return (
      <div className="min-h-screen bg-gray-50 mt-32 px-2">
        <h2 className="text-2xl px-2 mb-6 text-blue-900 font-semibold">
          Explore Our {slug[0].toUpperCase() + slug.slice(1)}'s Collection
        </h2>
        <Toaster position="top-center" />

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
              <FilterSidebar />
            </div>
            <div
              className="absolute right-0 top-0 h-full flex-1"
              onClick={() => setShowMobileFilters(false)}
            />
          </div>
        )}
        
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 lg:w-72 xl:w-80 bg-white shadow-sm border-r border-gray-200">
            <FilterSidebar className="sticky top-16" />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 ">
            {/* Search and Controls Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="max-w-7xl mx-auto">
                {/* Mobile Filter Button */}
                <div className="flex items-center gap-4 mb-4 md:hidden">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Filter size={18} />
                    <span className="text-sm font-medium">Filters</span>
                  </button>
                  {selectedSubcategory !== "All" && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <span>{selectedSubcategory}</span>
                      <button
                        onClick={() => setSelectedSubcategory("All")}
                        className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Search and View Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder={`Search ${slug}s...`}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>

                  {/* View and Sort Controls */}
                  <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded transition-colors ${
                          viewMode === "grid"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded transition-colors ${
                          viewMode === "list"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <List size={18} />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                    >
                      <option value="Featured">Featured</option>
                      <option value="Price: Low to High">
                        Price: Low to High
                      </option>
                      <option value="Price: High to Low">
                        Price: High to Low
                      </option>
                      <option value="Newest First">Newest First</option>
                    </select>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-gray-600">
                  {products.length > 0 && (
                    <span>
                      Showing {products.length}{" "}
                      {products.length === 1 ? "product" : "products"}
                      {selectedSubcategory !== "All" &&
                        ` in ${selectedSubcategory}`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Products Container */}
            <div className="p-4">
              <div className="max-w-7xl mx-auto">
                {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="text-gray-900 text-xl font-medium mb-2">
                      No products found
                    </div>
                    <p className="text-gray-500 text-center max-w-md">
                      Try adjusting your search terms or filter criteria to find
                      what you're looking for
                    </p>
                  </div>
                ) : (
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
                        : "space-y-6"
                    }`}
                  >
                    {products.map((product, index) => (
                      <div
                        onClick={() => handleProductClick(product.id)}
                        key={`${product.id}-${index}`}
                        className={`group cursor-pointer ${
                          viewMode === "list"
                            ? "flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100"
                            : "bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100"
                        } transition-all duration-300 hover:-translate-y-1`}
                      >
                        <div
                          className={`relative ${
                            viewMode === "list"
                              ? "w-full sm:w-48 aspect-[4/3] sm:aspect-[3/4] flex-shrink-0"
                              : "aspect-[4/3] md:aspect-[3/4]"
                          } overflow-hidden rounded-lg bg-gray-100`}
                        >
                          {slug === "wallpaper" ? (
                            <Carousal
                              images={product.colors?.map((item) => item.pic)}
                            />
                          ) : (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}

                          {/* Overlay with MoodBoard Button */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                            <button
                              className="bg-white/90 backdrop-blur-sm cursor-pointer p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                              onClick={(e) => handleHeartClick(e, product.id)}
                            >
                              <Heart className="w-5 h-5 text-gray-800" />
                            </button>
                          </div>
                        </div>

                        <div
                          className={`${
                            viewMode === "list" ? "flex-1 min-w-0" : "p-4"
                          } space-y-3`}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-2">
                            <div>
                              <span className="text-sm font-semibold">
                                {" "}
                                Sub category:
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                {product.subCategory}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-semibold">
                                {" "}
                                Brand:
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                {product.brand}
                              </span>
                            </div>
                          </div>

                          {slug === "wallpaper" && product.colors && (
                            <div className="flex gap-2 flex-wrap">
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

                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-gray-900">
                              ₹{product.price}
                              <span className="text-sm font-normal text-gray-500 ml-1">
                                /Sq.ft
                              </span>
                            </p>
                          </div>

                          {product.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Loading Indicator */}
                {products.length > 0 && (
                  <div
                    ref={ref}
                    className="flex items-center justify-center py-8 mt-8"
                  >
                    {loading && (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="text-gray-600">
                          Loading more products...
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Collection Modal */}
        {showCollectionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add to Collection
                </h3>
                <button
                  onClick={() => setShowCollectionModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Collections List */}
              <div className="space-y-3">
                {collections.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-blue-600"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M15 14.5C15 13.6716 15.6716 13 16.5 13C17.3284 13 18 13.6716 18 14.5C18 15.3284 17.3284 16 16.5 16C15.6716 16 15 15.3284 15 14.5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M13.5 18C13.5 16.6193 14.6193 15.5 16 15.5C17.3807 15.5 18.5 16.6193 18.5 18V19H13.5V18Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-center leading-relaxed">
                      You haven't created any Collections yet.
                      <br />
                      Go to{" "}
                      <span className="font-medium text-blue-600">
                        Profile → MoodBoard → Create MoodBoard
                      </span>
                    </p>
                  </div>
                ) : (
                  collections.map((collection) => (
                    <button
                      key={collection.id}
                      onClick={() => handleAddToCollection(collection.name)}
                      className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 group-hover:text-blue-700">
                          {collection.name}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowCollectionModal(false)}
                className="mt-6 w-full p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Products Available
          </h2>
          <p className="text-gray-600 leading-relaxed">
            No products found for{" "}
            <span className="font-medium">
              {slug}/{subCat}
            </span>
            .
            <br />
            Please check back later or explore other categories.
          </p>
        </div>
      </div>
    );
  }
}
