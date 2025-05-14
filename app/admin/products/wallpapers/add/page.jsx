"use client";
import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import axiosInstance from "@/utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const router = useRouter();

  // Add subcategory state
  const [newSubCategory, setNewSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState(["Radiance", "Opulence"]);

  // Update productData state to include subcategory
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    category: "wallpapers",
    subCategory: "",
    size: "",
    thickness: "",
    textures: [],
    dp: "", // Dealer Price
    gst: "",
    bp: "", // Base Price
    sampleCost: "",
    sampleInventory: "",
    description: "",
    images: ["", "", "", ""],
    colors: ["", "", "", ""],
    imageUrl: "", // Add this for imgbb url
  });

  const [textureInput, setTextureInput] = useState({
    name: "",
    cost: "",
  });

  const handleAddTexture = () => {
    if (!textureInput.name || !textureInput.cost) {
      toast.error("Please fill both texture name and cost");
      return;
    }
    setProductData((prev) => ({
      ...prev,
      textures: [...prev.textures, { ...textureInput }],
    }));

    // Clear inputs after adding
    setTextureInput({ name: "", cost: "" });
  };

  const handleRemoveTexture = (index) => {
    setProductData((prev) => ({
      ...prev,
      textures: prev.textures.filter((_, i) => i !== index),
    }));
  };
  
  // Add this function for imgbb upload
  const uploadToImgbb = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", "285c2670df5fb801f4da9505f610a5ae"); // Replace with your API key

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Update handleImageUpload
  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadToImgbb(file);
      if (imageUrl) {
        let newImages = [...productData.images];
        // Replace the image at the specific index
        newImages[index] = {
          url: URL.createObjectURL(file),
          name: file.name,
          imgbbUrl: imageUrl,
        };
        setProductData({
          ...productData,
          images: newImages,
        });
      }
    }
  };

  const handleRemoveImage = (index) => {
    let newImages = [...productData.images];
    newImages[index] = ""; // Reset the specific index to empty string
    setProductData({
      ...productData,
      images: newImages,
    });
  };

  const handleColorChange = (index, color) => {
    const newColors = [...productData.colors];
    newColors[index] = color;
    setProductData({
      ...productData,
      colors: newColors,
    });
  };

  // Add subcategory handlers
  const handleAddSubCategory = () => {
    if (newSubCategory.trim() && !subCategories.includes(newSubCategory)) {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filter out empty image/color pairs
      const validImageColorPairs = productData.images
        .map((img, index) => ({
          image: img,
          color: productData.colors[index],
        }))
        .filter((pair) => pair.image && pair.color && pair.color.trim() !== "");

      if (validImageColorPairs.length === 0) {
        toast.error("Please add at least one image with a corresponding color");
        return;
      }

      // Validate required fields
      const requiredFields = [
        "name",
        "brand",
        "description",
        "size",
        "thickness",
        "dp",
        "bp",
        "gst",
        "sampleCost",
        "subCategory",
        "textures",
        "sampleInventory",
      ];

      const missingFields = requiredFields.filter(
        (field) => !productData[field]
      );
      if (missingFields.length > 0) {
        toast.error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
        return;
      }
      if (productData.textures.length === 0) {
        toast.error("Please add at least one texture");
        return;
      }
      
      // Prepare the form data for submission
      const formattedImages = productData.images
        .map((img, index) => ({
          pic: img.imgbbUrl || "",
          color: productData.colors[index] || "",
        }))
        .filter((img) => img.pic && img.color);

      const formData = {
        name: productData.name,
        brand: productData.brand,
        description: productData.description,
        subCategory: productData.subCategory,
        size: productData.size,
        thickness: productData.thickness,
        dp: Number(productData.dp),
        gst: Number(productData.gst),
        bp: Number(productData.bp),
        sampleCost: Number(productData.sampleCost),
        sampleInventory: Number(productData.sampleInventory),
        texture: productData.textures.map((texture) => ({
          name: texture.name,
          cost: Number(texture.cost),
        })),
        images: formattedImages,
        isActive: true,
      };

      const res = await axiosInstance.post("/wallpapers/", formData);

      if (res.data.status === "success") {
        toast.success("Product added successfully");
        router.push("/admin/categories/wallpapers");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <form onSubmit={handleSubmit} className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 bg-white rounded-lg transition-colors border border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#003f62]">Add New Wallpaper</h1>
            <div className="text-sm text-gray-500 mt-1">
              Home <span className="mx-1">&gt;</span> Wallpapers <span className="mx-1">&gt;</span> Add New
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 md:p-8 space-y-8">
            {/* Basic Info Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    value={productData.name}
                    onChange={(e) => setProductData({...productData, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand*</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    value={productData.brand}
                    onChange={(e) => setProductData({...productData, brand: e.target.value})}
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category*</label>
                  <div className="flex gap-2">
                    <select
                      value={productData.subCategory}
                      onChange={(e) => setProductData({...productData, subCategory: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    >
                      <option value="">Select Sub Category</option>
                      {subCategories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="relative">
                      <input
                        type="text"
                        value={newSubCategory}
                        onChange={(e) => setNewSubCategory(e.target.value)}
                        placeholder="New category"
                        className="w-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleAddSubCategory}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size*</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    value={productData.size}
                    onChange={(e) => setProductData({...productData, size: e.target.value})}
                    placeholder="e.g. 10x10 ft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thickness*</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    value={productData.thickness}
                    onChange={(e) => setProductData({...productData, thickness: e.target.value})}
                    placeholder="e.g. 2mm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sample Inventory*</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    value={productData.sampleInventory}
                    onChange={(e) => setProductData({...productData, sampleInventory: e.target.value})}
                    placeholder="Enter quantity"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Price (DP)*</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg p-3 pl-7 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                      value={productData.dp}
                      onChange={(e) => setProductData({...productData, dp: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST (%)*</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    value={productData.gst}
                    onChange={(e) => setProductData({...productData, gst: e.target.value})}
                    placeholder="e.g. 18"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (BP)*</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg p-3 pl-7 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                      value={productData.bp}
                      onChange={(e) => setProductData({...productData, bp: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sample Cost*</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg p-3 pl-7 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                      value={productData.sampleCost}
                      onChange={(e) => setProductData({...productData, sampleCost: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Textures Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Textures</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-start">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texture Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                      value={textureInput.name}
                      onChange={(e) => setTextureInput({...textureInput, name: e.target.value})}
                      placeholder="e.g. Matte"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost per sq.ft</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg p-3 pl-7 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        value={textureInput.cost}
                        onChange={(e) => setTextureInput({...textureInput, cost: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={handleAddTexture}
                      className="px-4 py-2.5 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-colors flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Texture
                    </button>
                  </div>
                </div>

                {/* Texture List */}
                {productData.textures.length > 0 && (
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Texture Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost (₹)</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {productData.textures.map((texture, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{texture.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{texture.cost}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => handleRemoveTexture(index)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Description</h2>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.description}
                onChange={(e) => setProductData({...productData, description: e.target.value})}
                placeholder="Enter product description"
              />
            </div>

            {/* Images Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Product Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image {index + 1}</label>
                      <div className="relative h-40 bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                        {productData.images[index] ? (
                          <>
                            <Image
                              src={productData.images[index].url}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-10 w-10 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">Click to upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        value={productData.colors[index] || ""}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        placeholder="e.g. Blue, Red, etc."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
