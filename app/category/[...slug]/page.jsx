"use client";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Search,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/AxiosInstance";
import { use } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CategoryPage({ params }) {
  const router = useRouter();

  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const slug = decodeURIComponent(unwrappedParams.slug[0]);
  const subCat = decodeURIComponent(unwrappedParams.slug[1]);
  console.log(subCat, "sub cat");

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

  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [collections, setCollections] = useState([,]);

  const handleHeartClick = (e, product) => {
    e.stopPropagation(); // Prevent product click event
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

  // const handleCreateCollection = async () => {
  //   console.log("calnf")
  //   if (!newCollectionName.trim()) return;

  //   try {
  //     const response = await axiosInstance.post("user/create-moodBoard", {
  //       name: newCollectionName,
  //       address: "", // Since collections don't have addresses in this context
  //     });

  //     if (response.data.success) {
  //       // Update collections with the server response
  //       const newCollection = {
  //         id: collections.length + 1,
  //         name: newCollectionName,
  //         products: [],
  //       };
  //       setCollections([...collections, newCollection]);
  //       setNewCollectionName("");
  //       setShowCollectionModal(false);
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error creating collection:", error);
  //     toast.error(error.response?.data?.message || "Failed to create collection");
  //   }
  // };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Reset current page when searching
      const url =
        slug === "wallpaper"
          ? `/wallpapers/products?page=1&limit=10&subCategory=${selectedSubcategory}&search=${searchQuery}`
          : `/wooden-floors/products?page=1&limit=10&subCategory=${selectedSubcategory}&search=${searchQuery}`;
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        const { totalPages, currentPage, data } = res.data;
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
      setProducts([]); // Reset products on error
    } finally {
      setLoading(false);
    }
  };
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
  // Update the search input handler to reset page
  const handleSearch = (e) => {
    setCurrentPage(0); // Reset page when searching
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
        const url =
          slug === "wallpaper"
            ? `/wallpapers/products?page=${nextPage}&limit=10&subCategory=${selectedSubcategory}&search=${searchQuery}&sortBy=${sortBy}`
            : `/wooden-floors/products?page=${nextPage}&limit=10&subCategory=${selectedSubcategory}&search=${searchQuery}&sortBy=${sortBy}`;
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
  }, [selectedSubcategory, searchQuery]);

  useEffect(() => {
    if (inView && !loading && CurrentPage < TotalPages) {
      loadMoreProducts();
    }
  }, [inView, loading, CurrentPage, TotalPages]);

  useEffect(() => {
    if (inView && !loading) {
      loadMoreProducts();
    }
  }, [inView]);

  const handleProductClick = (productId) => {
    if (slug === "wallpaper") {
      router.push(`/products/wallpapers/${productId}`);
    } else if (slug === "wooden flooring") {
      router.push(`/products/wooden-flooring/${productId}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const url =
        slug === "wallpaper"
          ? "/wallpapers/getCategories"
          : "/wooden-floors/getCategories";
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        setSubcategories(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //  const [loading,setLoading]=useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(products, "products");

  console.log(slug, "slug");

  if (slug === "wallpaper" || slug == "wooden flooring") {
    return (
      <div className="min-h-screen mt-15 bg-gray-50 py-8">
        {/* Category Header */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-3xl font-serif capitalize mb-6">
            {slug.replace("-", " ")}
          </h1>
          <Toaster />
          {/* Subcategories Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Categories</h2>
            <div className="flex flex-nowrap overflow-x-auto pb-2 md:flex-wrap gap-3 -mx-4 px-4 md:mx-0 md:px-0">
              <button
                onClick={() => {
                  setCurrentPage(0);
                  setSelectedSubcategory("All");
                }}
                className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                  selectedSubcategory === "All"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                All
              </button>
              {subcategories.map((subcat) => (
                <button
                  key={subcat.id}
                  onClick={() => {
                    setCurrentPage(0);
                    setSelectedSubcategory(subcat.name);
                  }}
                  className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                    selectedSubcategory === subcat.name
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {subcat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchQuery}
                onChange={handleSearch} // Use the new handler
              />
            </div>

            <div className="flex flex-row justify-between sm:justify-end items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid" ? "bg-gray-100" : ""
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list" ? "bg-gray-100" : ""
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value={"Featured"}>Featured</option>
                <option value={"Price: Low to High"}>Price: Low to High</option>
                <option value={"Price: High to Low"}>Price: High to Low</option>
                <option value={"Newest First"}>Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid/List View */}
        <div className="max-w-7xl mx-auto px-4">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                No products found
              </div>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }`}
            >
              {products.map((product, index) => (
                <div
                  onClick={() => handleProductClick(product.id)}
                  key={`${product.id}-${index}`}
                  className={`group relative  ${
                    viewMode === "list"
                      ? "flex gap-6 bg-white p-4 rounded-lg"
                      : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-48 aspect-[3/4]" : "aspect-[3/4]"
                    } overflow-hidden rounded-lg bg-gray-100`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover cursor-cell transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        className="bg-white cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={(e) => handleHeartClick(e, product.id)}
                      >
                        <Heart size={20} className="text-gray-800" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`${
                      viewMode === "list" ? "flex-1" : "mt-4"
                    } space-y-2`}
                  >
                    <h3 className="text-lg font-medium cursor-pointer text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-700">{product.subCategory}</p>
                    <p className="text-gray-700 font-bold">
                      {" "}
                      ₹{product.price} /Sq.ft
                    </p>
                    {viewMode === "list" && (
                      <p className="text-gray-600 mt-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading trigger element */}
          {products.length > 0 && (
            <div
              ref={ref}
              className="h-10 w-full flex items-center justify-center mt-8"
            >
              {loading && (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              )}
            </div>
          )}
        </div>
        {showCollectionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add to Collection</h3>

              {/* Collections List */}
              <div className="space-y-2">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => handleAddToCollection(collection.name)}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {collection.name}
                  </button>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowCollectionModal(false)}
                className="mt-4 w-full p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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
      <div className="h-screen mt-20 text-center">
        <h2 className="text-blue-800 font-bold mt-50">
          No products for {slug}/{subCat},please visit later
        </h2>
      </div>
    );
  }
}
