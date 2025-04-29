"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter} from "react-icons/fa6";

// Single fetchProduct function with all data
// Update the fetchProduct function with a more detailed description
async function fetchProduct(id) {
  return {
    id,
    name: "Premium Wallpaper",
    price: 99.99,
    quantity: 1,
    description: "Transform your space with our premium wallpaper collection. This exquisite design features intricate patterns and rich textures that add sophistication to any room. Made with high-quality materials, our wallpapers are easy to install, water-resistant, and designed to maintain their beauty for years. Perfect for both residential and commercial spaces, this wallpaper combines durability with elegant aesthetics.",
    features: [
      "Premium materials",
      "Easy to install",
      "Water resistant",
      "Eco-friendly",
    ],
    textures: ['Feather', 'Canvas', 'Leather', 'Silk'],
    sizes: ['Custom Roll Size', 'Sample'],
    images: [
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
    ],
  };
}

const RelatedProduct = ({ product }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-square overflow-hidden rounded-lg">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
    <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
    <div className="flex gap-2 mt-2">
      {product.colors.map((color, index) => (
        <div
          key={index}
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
          aria-label={color}
        />
      ))}
    </div>
  </div>
);

const FeatureItem = ({ feature }) => (
  <li className="flex items-center text-gray-600">
    <svg
      className="w-5 h-5 mr-2 text-green-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M5 13l4 4L19 7"></path>
    </svg>
    {feature}
  </li>
);

const Thumbnail = ({ image, index, selectedImage, setSelectedImage }) => (
  <div
    key={index}
    className={`relative w-20 h-20 cursor-pointer border-2 transition-colors ${
      selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => setSelectedImage(index)}
    aria-label={`View image ${index + 1}`}
  >
    <Image
      src={image}
      alt={`Thumbnail ${index + 1}`}
      fill
      className="object-cover"
      sizes="80px"
    />
  </div>
);

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Custom Roll Size');
  const [selectedTexture, setSelectedTexture] = useState('Feather');
  // Update the initial states
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    area: 0,
    wastageArea: 0,
    totalArea: 0,
  });
  
  const [priceDetails, setPriceDetails] = useState({
    basePrice: 99.99,
    totalPrice: 99.99, // Set initial total price same as base price
  });

  const handleDimensionChange = useCallback((e, key) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    
    setDimensions(prev => {
      const newDimensions = {
        ...prev,
        [key]: value
      };
      
      const area = newDimensions.width * newDimensions.height;
      const wastageArea = area * 0.10;
      const totalArea = area + wastageArea;
  
      const basePrice = product.price;
      let totalPrice = basePrice;
  
      if (selectedSize === 'Custom Roll Size') {
        if (newDimensions.width > 0 && newDimensions.height > 0) {
          const areaBasedPrice = basePrice * area;
          const wastageCharge = areaBasedPrice * 0.10;
          totalPrice = Math.ceil(areaBasedPrice + wastageCharge);
        } else {
          totalPrice = basePrice; // Show base price if dimensions are 0
        }
      }
      
      setPriceDetails({
        basePrice,
        totalPrice,
      });
  
      return {
        ...newDimensions,
        area: Math.round(area),
        wastageArea: Math.round(wastageArea),
        totalArea: Math.round(totalArea),
      };
    });
  }, [product?.price, selectedSize]);

  // Add this effect to handle size selection
  useEffect(() => {
    if (selectedSize === 'Sample') {
      setPriceDetails(prev => ({
        ...prev,
        totalPrice: prev.basePrice
      }));
    } else {
      handleDimensionChange({ target: { value: dimensions.width } }, 'width');
    }
  }, [selectedSize]);
  
  const imageRef = useRef(null);

  // Update the relatedProducts array
  const relatedProducts = [
    {
      id: 1,
      name: 'Raas Collection',
      image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
      colors: ['brown', 'beige']
    },
    {
      id: 2,
      name: 'Pastel Garden',
      image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
      colors: ['gray', 'sage', 'mint']
    },
    {
      id: 3,
      name: 'Scenic Feathers',
      image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
      colors: ['gray', 'red']
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchProduct(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleImageHover = useCallback((e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  }, []);

  const updateProduct = useCallback((updatedQuantity) => {
    setProduct(prev => ({ ...prev, quantity: updatedQuantity }));
  }, []);

  const incrementProductQuantity = useCallback(() => {
    updateProduct(product.quantity + 1);
  }, [product?.quantity, updateProduct]);

  const decrementProductQuantity = useCallback(() => {
    if (product?.quantity > 1) {
      updateProduct(product.quantity - 1);
    }
  }, [product?.quantity, updateProduct]);

  const handleProductToCart = useCallback(() => {
    fetch("/api/add-product-to-cart")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-600">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 max-w-[1440px]">
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Left side - Images */}
        <div className="lg:col-span-7 flex gap-4 overflow-hidden">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2">
            {product.images.map((image, index) => (
              <Thumbnail 
                key={index}
                image={image}
                index={index}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            ))}
          </div>

          {/* Main Image with Zoom */}
          <div className="flex-1 relative aspect-square max-h-[600px]">
            <div
              className="relative w-full h-full"
              onMouseMove={handleImageHover}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              ref={imageRef}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover rounded-xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {showZoom && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[selectedImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat',
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          
          <div className="space-y-2">
            <div className="text-2xl font-medium text-blue-600">
              ₹{priceDetails.totalPrice}
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Base price: ₹{priceDetails.basePrice}</p>
              <p>Area: {dimensions.area} sq. inches</p>
              <p>Wastage (10%): {dimensions.wastageArea} sq. inches</p>
              <p>Total Area: {dimensions.totalArea} sq. inches</p>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-6 border-t pt-6">
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex gap-4">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`px-4 py-2 border rounded transition-colors ${
                      selectedSize === size ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Texture Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Paper Texture</label>
              <div className="flex flex-wrap gap-4">
                {product.textures.map(texture => (
                  <button
                    key={texture}
                    className={`px-4 py-2 border rounded transition-colors ${
                      selectedTexture === texture ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTexture(texture)}
                  >
                    {texture}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width (in)</label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => handleDimensionChange(e, 'width')}
                  className="border rounded px-3 py-2 w-full"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height (in)</label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => handleDimensionChange(e, 'height')}
                  className="border rounded px-3 py-2 w-full"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Area (sq. inches)</label>
                <input
                  type="number"
                  value={dimensions.area}
                  readOnly
                  className="border rounded px-3 py-2 w-full bg-gray-50"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Total area: Width × Height
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex border rounded">
              <button
                onClick={decrementProductQuantity}
                className="px-4 py-2 border-r hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-6 py-2">{product.quantity}</span>
              <button
                onClick={incrementProductQuantity}
                className="px-4 py-2 border-l hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleProductToCart}
              className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button className="w-full py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium mb-3">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Features */}
          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium mb-3">Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </ul>
          </div>

          {/* Share buttons */}
          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium mb-3">Share</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <FaWhatsapp className="text-xl" />
                WhatsApp
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                <FaSquareXTwitter className="text-xl" />
                Twitter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <RelatedProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}