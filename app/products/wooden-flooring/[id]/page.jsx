"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function WoodenFlooringProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Sample");
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    area: 0,
  });
  const router = useRouter();

  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProducts = async (selectedSubcategory) => {
    console.log(selectedSubcategory, "selectedSubcategory");
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/wooden-floors/products?page=1&limit=6&subCategory=${selectedSubcategory}`
      );
      if (res.status === 200) {
        const { data } = res.data;
        setRelatedProducts(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchWoodenFlooringProduct = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/wooden-floors/product/${id}`);
      console.log(response.data, "data");
      setCurrentProduct(response.data.data);
      // console.log(currentProduct?., "currentProduct?.");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw error.response?.data || error.message;
    }
  };
  useEffect(() => {
    fetchWoodenFlooringProduct();
    fetchProducts(currentProduct?.subCategory || "All");
  }, []);

  const [unit, setUnit] = useState("inches");

  const [price, setPrice] = useState("");

  const [selectedWalls, setSelectedWalls] = useState(["A"]);
  const [activeWall, setActiveWall] = useState("A");
  // Update wallDimensions state to include price
  const [wallDimensions, setWallDimensions] = useState({
    A: { width: 0, height: 0, area: 0, price: 0 },
    B: { width: 0, height: 0, area: 0, price: 0 },
    C: { width: 0, height: 0, area: 0, price: 0 },
    D: { width: 0, height: 0, area: 0, price: 0 },
  });

  useEffect(() => {
    const totalWallsPrice =wallDimensions.A.price + wallDimensions.B.price + wallDimensions.C.price + wallDimensions.D.price;
    setPrice(selectedSize==="Sample"? currentProduct?.sampleCost : totalWallsPrice);
  }, [wallDimensions, selectedWalls, selectedSize, quantity]);

  // Update useEffect for price calculations
  useEffect(() => {
    if (dimensions.width > 0 || dimensions.height > 0) {
      let width = dimensions.width;
      let height = dimensions.height;

      if (unit === "inches") {
        width = width / 12;
        height = height / 12;
      }

      const area = width * height;
      const areaWithWaste = area + area * 0.1;
      const basePrice = currentProduct?.dp;
      const wallPrice = Math.ceil(basePrice * Math.ceil(areaWithWaste));
      setDimensions((prev) => ({ ...prev, area: Math.ceil(areaWithWaste) }));

      setWallDimensions((prev) => ({
        ...prev,
        [activeWall]: {
          width: dimensions.width,
          height: dimensions.height,
          area: Math.ceil(areaWithWaste),
          price: wallPrice,
        },
      }));
    }
  }, [dimensions.width, dimensions.height, unit, activeWall]);


  const handleAddToCart = async () => {
    // Check if token exists in both Redux and localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add to cart");
      router.push("/login"); // Redirect to login page
      return;
    }

    try {
      let data = {};
      if (selectedSize === "Custom Roll Size") {
        // Create an object with only the selected walls
        const selectedFloorAreas = {};
        
        // Only include walls that are selected and have dimensions
        selectedWalls.forEach(wall => {
          if (wallDimensions[wall].area > 0) {
            selectedFloorAreas[`wall${wall}`] = wallDimensions[wall];
          }
        });
        
        // Check if any walls are selected
        if (Object.keys(selectedFloorAreas).length === 0) {
          toast.error("Please select at least one wall and provide dimensions");
          return;
        }
        
        data = {
          productId: currentProduct?._id,
          productType: "WoodenFloor",
          isSample: false,
          size: {
            unit: unit, // Use the selected unit instead of hardcoding "feet"
          },
          floorArea: selectedFloorAreas,
          pricePerUnit: currentProduct?.dp,
          totalPrice: price,
        };
      } else {
        data = {
          productId: currentProduct?._id,
          productType: "WoodenFloor",
          isSample: true,
          quantity: quantity,
          pricePerUnit: currentProduct?.sampleCost,
          totalPrice: currentProduct?.sampleCost * quantity,
        };
      }
      if (data.totalPrice === 0) {
        toast.error("Please give custom size for walls");
        return;
      }

      const res = await axiosInstance.post("/cart/add-to-cart", {
        items: [data],
      });
      if (res.status === 200) {
        toast.success("Product added to cart");
        router.push("/cart");
      }
    } catch (error) {
      console.error("Cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleWallSelection = (wall) => {
    //if (wall === "A") return; // Wall A cannot be deselected

    setSelectedWalls((prev) => {
      if (prev.includes(wall)) {
        return prev.filter((w) => w !== wall);
      }
      return [...prev, wall];
    });
    setActiveWall(wall);

    // Reset dimensions when switching walls
    setDimensions({
      width: wallDimensions[wall].width,
      height: wallDimensions[wall].height,
      area: wallDimensions[wall].area,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className=" h-32 w-40 text-blue-500"> No product found...</div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-red-500">Error: {error}</div>
  //     </div>
  //   );
  // }

  // Update your JSX to use the currentProduct?. data
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Image */}
        <Toaster />
        <div className="relative aspect-[4/3] sm:aspect-[3/4] bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden">
          <Image
            src={
              currentProduct?.images ||
              "https://www.bohomaterials.com/web/image/product.product/16/image_1024/Walnut%20Dark?unique=f7b911a"
            }
            alt={currentProduct?.name || "Premium Wooden Flooring"}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {currentProduct?.name || "Premium Wooden Flooring"}
            </h1>
            <p className="text-sm mt-2 opacity-60 font-medium text-gray-700">
              {currentProduct?.description}
            </p>
            <p className="text-xl sm:text-2xl font-medium text-gray-900 mt-2 sm:mt-4">
              ₹{' '}
              {selectedSize === "Sample"
                ? currentProduct?.sampleCost?.toLocaleString('en-IN')
                : price?.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm font-medium text-gray-700">Size</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className={`w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 transition-all text-sm sm:text-base ${
                  selectedSize === "Custom Roll Size"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedSize("Custom Roll Size")}
              >
                Order Size
              </button>
              <button
                className={`w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 transition-all text-sm sm:text-base ${
                  selectedSize === "Sample"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedSize("Sample")}
              >
                Sample
              </button>
            </div>
          </div>

          {/* Quantity Selection */}
          {selectedSize === "Sample" && (
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm font-medium text-gray-700">Quantity</p>
              <div className="inline-flex items-center">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-l-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <div className="w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  <span className="text-sm sm:text-base text-gray-900 font-medium">
                    {quantity}
                  </span>
                </div>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-r-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Dimensions Section */}
          {selectedSize === "Custom Roll Size" && (
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    Select type
                  </label>
                  <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => setUnit("inches")}
                      className={`px-3 sm:px-4 py-2 rounded-lg transition-all text-sm ${
                        unit === "inches"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => setUnit("feet")}
                      className={`px-3 sm:px-4 py-2 rounded-lg transition-all text-sm ${
                        unit === "feet"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Feet
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Width ({unit})
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg"
                    value={dimensions.width}
                    onChange={(e) => {
                      setDimensions((prev) => ({
                        ...prev,
                        width: parseFloat(e.target.value) || 0,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Height ({unit})
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg"
                    value={dimensions.height}
                    onChange={(e) => {
                      setDimensions((prev) => ({
                        ...prev,
                        height: parseFloat(e.target.value) || 0,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Area (sq.ft)
                </label>
                <input
                  type="number"
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg bg-gray-100"
                  value={dimensions.area}
                  readOnly
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Total area: Width × Height
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  No.of cartons: {Math.ceil(dimensions.area / 18.36)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Profiles needed per running sqft:{" "}
                  {Math.ceil(2 * (dimensions.width + dimensions.height))}
                </p>
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-600">
                    Area is inclusive of wastage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wall Selection */}
          {selectedSize === "Custom Roll Size" && (
            <div className="space-y-3 sm:space-y-4">
              <span className="text-sm font-medium text-gray-700">
                Select Floor Area
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {["A", "B", "C", "D"].map((wall) => (
                  <button
                    key={wall}
                    onClick={() => handleWallSelection(wall)}
                    className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 transition-all text-sm ${
                      selectedWalls.includes(wall)
                        ? wall === activeWall
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Floor {wall}
                  </button>
                ))}
              </div>
              {/* Display selected wall dimensions */}
              <div className="mt-4 space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                {selectedWalls.map((wall) => (
                  <div
                    key={wall}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600"
                  >
                    <span className="font-medium">Wall {wall}:</span>
                    <span>
                      {wallDimensions[wall].width}x{wallDimensions[wall].height}{" "}
                      {unit}
                    </span>
                    <span>({wallDimensions[wall].area} sq.ft)</span>
                    <span className="text-blue-600">
                      ₹{wallDimensions[wall].price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                {selectedWalls.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-700">
                      Total Area:{" "}
                      {Object.entries(wallDimensions)
                        .filter(([wall]) => selectedWalls.includes(wall))
                        .reduce((sum, [_, dims]) => sum + dims.area, 0)}{" "}
                      sq.ft
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 sm:py-4 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            >
              Add to Cart
            </button>
            {/* <button className="w-full py-3 sm:py-4 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-medium">
              Buy Now
            </button> */}
          </div>

          {/* Specifications */}
          <div className="pt-6 sm:pt-8 border-t">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Specifications
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {[
                { label: "Brand", value: currentProduct?.brand || "N/A" },
                { label: "Size", value: `${currentProduct?.size || "N/A"}` },
                { label: "Thickness", value: `${currentProduct?.thickness}` },
                { label: "Core", value: currentProduct?.core || "N/A" },
                { label: "Finish", value: currentProduct?.finish || "N/A" },
                { label: "Shade", value: currentProduct?.shade || "N/A" },
                { label: "Surface", value: currentProduct?.surface || "N/A" },
                // { label: 'Features', value: currentProduct?.?.features?.join(', ') || 'N/A' },
                {
                  label: "Cost Per SqFt",
                  value: currentProduct?.costPerSqFtPerBox?.box || "N/A",
                },
                {
                  label: "Sub Category",
                  value: currentProduct?.subCategory || "N/A",
                },
              ].map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row py-2.5 sm:py-3 border-b border-gray-100"
                >
                  <span className="text-sm sm:text-base text-gray-600 sm:w-1/2">
                    {spec.label}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-gray-900 sm:w-1/2">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="pt-6 sm:pt-8">
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Have a question? We are here to help :)
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="w-full py-2.5 sm:py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base font-medium">
                Order on WhatsApp
              </button>
              <button className="w-full py-2.5 sm:py-3 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base font-medium">
                +91-81215 22945
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">More products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              onClick={() => {
                router.push(`/products/wooden-flooring/${relatedProduct.id}`);
              }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {relatedProduct.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
