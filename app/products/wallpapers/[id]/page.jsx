"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/AxiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { color } from "framer-motion";

export default function WallpaperProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Custom Roll Size");
  // Add the missing texture state
  const [selectedTexture, setSelectedTexture] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    area: 0,
    texture:"",
    color: ""
  });
  const [unit, setUnit] = useState("inches");
  const [price, setPrice] = useState(0);

  const [selectedWalls, setSelectedWalls] = useState(["A"]);
  const [activeWall, setActiveWall] = useState("A");
  // Update wallDimensions state to include price
  const [wallDimensions, setWallDimensions] = useState({
    A: { width: 0, height: 0, area: 0, price: 0, texture: "", color: "" },
    B: { width: 0, height: 0, area: 0, price: 0, texture: "", color: "" },
    C: { width: 0, height: 0, area: 0, price: 0, texture: "", color: "" },
    D: { width: 0, height: 0, area: 0, price: 0, texture: "", color: "" },
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/wallpapers/product/${id}`);
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
    fetchProduct();
  }, []);
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
      // Fix: Access texture array correctly
      const selectedTextureData = currentProduct?.texture[selectedTexture];
      const basePrice = selectedTextureData?.cost || 0;
      const wallPrice = Math.ceil(basePrice * Math.ceil(areaWithWaste));

      setDimensions((prev) => ({ ...prev, area: Math.ceil(areaWithWaste) }));

      setWallDimensions((prev) => ({
        ...prev,
        [activeWall]: {
          width: dimensions.width,
          height: dimensions.height,
          area: Math.ceil(areaWithWaste),
          price: wallPrice,
          texture: currentProduct?.texture[selectedTexture]?.name,
          color: currentProduct?.images[selectedImage].color,
        },
      }));
    }
  }, [dimensions.width, dimensions.height, unit, activeWall, selectedTexture,selectedImage]);

  // Update useEffect for total price calculation
  useEffect(() => {
    let totalWallsPrice =
      wallDimensions.A.price +
      wallDimensions.B.price +
      wallDimensions.C.price +
      wallDimensions.D.price;

    setPrice(
      selectedSize === "Sample" ? currentProduct?.sampleCost : totalWallsPrice
    );
  }, [wallDimensions, selectedWalls, selectedSize, selectedTexture]);

  const handleAddToCart = async () => {
    // Check if token exists in both Redux and localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add to cart");
      router.push("/login"); // Redirect to login page
      return;
    }

    try {
      let cartData = {
        productId: currentProduct?._id,
        productType: "Wallpaper",
        isSample: selectedSize === "Sample",
      };

      if (selectedSize === "Sample") {
        cartData = {
          ...cartData,
          quantity,
          pricePerUnit: currentProduct?.sampleCost,
          totalPrice: currentProduct?.sampleCost * quantity,
        };
      } else {
        // Validate wall dimensions
        const hasValidDimensions = selectedWalls.every(
          (wall) =>
            wallDimensions[wall].width > 0 && wallDimensions[wall].height > 0
        );

        if (!hasValidDimensions) {
          toast.error("Please enter valid dimensions for all selected walls");
          return;
        }

        cartData = {
          ...cartData,
          size: { unit },
          floorArea: Object.fromEntries(
            selectedWalls.map((wall) => [`wall${wall}`, wallDimensions[wall]])
          ),
          pricePerUnit: currentProduct?.dp,
          totalPrice: price,
        };
      }

      const res = await axiosInstance.post("/cart/add-to-cart", {
        items: [cartData],
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
    if (wall === "A") return; // Wall A cannot be deselected

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
      texture: wallDimensions[wall].texture,
      color: wallDimensions[wall].color,
    });
  };

  // Add color options

  console.log(currentProduct, "ptojhjhbnb");
  // Update the Product Image section
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Image Section */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
            {currentProduct?.images.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={item.pic}
                  alt={`Product Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <div className="relative h-[200px] sm:h-[400px] lg:h-[600px] bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={currentProduct?.images[selectedImage].pic}
                alt="Product Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {currentProduct?.name}
            </h1>
            <p className="text-sm mt-2 opacity-60 font-medium text-gray-700">
              {currentProduct?.description}
            </p>
            <p className="text-xl sm:text-2xl font-medium text-gray-900 mt-2 sm:mt-4">
              ₹
              {selectedSize === "Sample"
                ? currentProduct?.sampleCost
                : `${price}`}
            </p>
          </div>

          {/* Texture Selection */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm font-medium text-gray-700">Paper Texture</p>
            <div className="flex overflow-x-auto sm:flex-wrap gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
              {currentProduct?.texture.map((texture, index) => (
                <button
                  key={texture.name}
                  className={`flex-shrink-0 sm:flex-shrink flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 transition-all whitespace-nowrap ${
                    selectedTexture === index
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTexture(index)}
                >
                  <span className="font-medium">{texture.name}</span>
                  <span className="text-sm text-gray-500">₹{texture.cost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm font-medium text-gray-700">Colour</p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {currentProduct?.images.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-transform ${
                    selectedImage === index
                      ? "border-blue-500 scale-110"
                      : "border-gray-200 hover:scale-110"
                  }`}
                  style={{ backgroundColor: item.color }}
                  aria-label={item.color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm font-medium text-gray-700">Size</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 transition-all text-sm sm:text-base ${
                  selectedSize === "Custom Roll Size"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedSize("Custom Roll Size")}
              >
                Order Size
              </button>
              <button
                className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 transition-all text-sm sm:text-base ${
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

          {/* Quantity Selection - Only show when Sample is selected */}
          {selectedSize === "Sample" && (
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm font-medium text-gray-700">Quantity</p>
              <div className="inline-flex items-center">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-l-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  <span className="text-gray-900 font-medium">{quantity}</span>
                </div>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-r-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sq.ft)
                </label>
                <input
                  type="number"
                  className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg bg-gray-100"
                  value={dimensions.area}
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-2">
                  Total area: Width × Height
                </p>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className=" text-sm text-blue-600">
                    Area is inclusive of wastage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wall Selection */}
          {selectedSize === "Custom Roll Size" && (
            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-700">
                Select Wall
              </span>
              <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3">
                {["A", "B", "C", "D"].map((wall) => (
                  <button
                    key={wall}
                    onClick={() => handleWallSelection(wall)}
                    className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 transition-all ${
                      selectedWalls.includes(wall)
                        ? wall === activeWall
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Wall {wall}
                  </button>
                ))}
              </div>
              {/* Wall Dimensions Display */}
              <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                {selectedWalls.map((wall) => (
                  <div
                    key={wall}
                    className="text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
                  >
                    <span className="font-medium">Wall {wall}:</span>
                    <span>
                      {wallDimensions[wall].width}x{wallDimensions[wall].height}{" "}
                      {unit}
                    </span>
                    <span>texture:{wallDimensions[wall].texture}</span>
                    <span> color:&nbsp;</span>
                    <span className="flex text-center">
                      <input
                        type="color"
                        value={wallDimensions[wall].color}
                        disabled
                      />
                    </span>
                    <span>({wallDimensions[wall].area} sq.ft)</span>
                    <span className="text-blue-600">
                      ₹{wallDimensions[wall].price}
                    </span>
                  </div>
                ))}
                {selectedWalls.length > 1 && (
                  <div className="text-sm font-medium text-gray-700 mt-3 pt-3 border-t">
                    Total Area:{" "}
                    {Object.entries(wallDimensions)
                      .filter(([wall]) => selectedWalls.includes(wall))
                      .reduce((sum, [_, dims]) => sum + dims.area, 0)}{" "}
                    sq.ft
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            >
              Add to Cart
            </button>
          </div>

          {/* Specifications */}
          <div className="pt-6 sm:pt-8 border-t">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Specifications
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {/* {[
                { label: "Brand", value: currentProduct?.brand || "N/A" },
                { label: "Size", value: `${currentProduct?.size || "N/A"}` },
                { label: "Thickness", value: `${currentProduct?.thickness}` },
                {
                  label: "Cost Per SqFt",
                  value: currentProduct?.perSquareCost || "N/A",
                },
                {
                  label: "Sub Category",
                  value: currentProduct?.subCategory || "N/A",
                },
                { label: 'Fire resistance', value: currentProduct?.features?.join(', ') || 'N/A' },

              ] */}
              {currentProduct?.features.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row py-2.5 sm:py-3 border-b border-gray-100"
                >
                  <span className="capitalize text-sm sm:text-base text-gray-900 sm:w-1/2">
                    {Object.keys(spec)[0]}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-gray-600 sm:w-1/2">
                    {Object.values(spec)[0]}
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
              <button className="w-full py-2.5 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base font-medium">
                Order on WhatsApp
              </button>
              <button className="w-full py-2.5 sm:py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base font-medium">
                +91-81215 22945
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      {/* <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Related products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            name: 'Peacock Garden',
            image: images[0],
            colors: ['beige', 'green']
          },
          {
            id: 2,
            name: 'Floral Delight',
            image: images[1],
            colors: ['blue', 'white']
          },
          {
            id: 3,
            name: 'Nature\'s Canvas',
            image: images[2],
            colors: ['green', 'brown']
          },
        ].map((relatedProduct) => (
          <div key={relatedProduct.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden">
              <Image
                src={relatedProduct.image}
                alt={relatedProduct.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{relatedProduct.name}</h3>
              <div className="flex gap-2 mt-2">
                {relatedProduct.colors.map((color, index) => (
                  <span key={index} className="text-sm text-gray-500">{color}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div> */}
    </div>
  );
}
