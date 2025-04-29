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
  console.log(productData);
  // Add this function for imgbb upload

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
      const formData = {
        name: productData.name,
        brand: productData.brand,
        description: productData.description,
        subCategory: productData.subCategory,
        features: [
          {
            "coverage":
              "Wallpapers are supplied in custom-sized panels based on your wall dimensions.Each design is split into multiple sections for precise, easy installation.",
          },
          {
            "printing":
              "Digitally printed for vivid, life-like designs,Made using eco-friendly, child-safe inks — safe for homes, kids' rooms, and hospitality spaces",
          },
          {
            "installation":
              "Professional installation is essential to ensure a flawless finish.Installation is not provided by us directly. However, our Customer Care team can connect you with experienced independent installers.Installation charges are paid directly to the installer.Specially designed to create seamless joints between panels once installed.",
          },
          {
            "Preparation & Application":
              "Walls should be finished with oil-based primer or paint and cured for at least 5 days before installation.Suitable surfaces include smooth finished walls, MDF boards, or wood panels.Recommended for indoor use only — not suitable for direct sunlight or exterior exposure.",
          },
          {
           "Fire_resistant": "EU: B, s1-d0 US: class A",
          },
          {
            "Application":
              "Apply a ready mixed PVA or EVA clear adhesive directly to the wall, no need to humidify the back of the wallcovering.",
          },
          {
            "washable": "Yes",
          },
          // You can add more features here if needed
        ],
        size: productData.size,
        thickness: productData.thickness,
        dp: Number(productData.dp),
        gst: Number(productData.gst),
        bp: Number(productData.bp),
        sampleCost: Number(productData.sampleCost),
        sampleInventory: productData.sampleInventory,
        images: validImageColorPairs.map((pair) => ({
          color: pair.color,
          pic: pair.image.imgbbUrl,
        })),
        tags: [],
        isActive: true,
        stock: 0,
        texture: productData.textures,
      };
      console.log(formData,
        "fje"
      );

      const res = await axiosInstance.post("/wallpapers/", formData);

      if (res.data.status === "success") {
        toast.success("Product added successfully");
        router.push("/admin/categories/wallpapers");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  };
  console.log(productData);
  // ... Rest of your component code ...
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gray-50 p-4 md:p-6"
    >
      <Toaster />
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 focus:bg-white rounded-lg transition-colors border border-gray-200"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#003f62]">
            Add New Wallpaper
          </h1>
          <div className="text-sm text-gray-500 mt-1">
            Home <span className="mx-1">&gt;</span> Wallpapers{" "}
            <span className="mx-1">&gt;</span> Add New
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 md:p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name*
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Category*
              </label>
              <div className="flex gap-2">
                <select
                  value={productData.subCategory}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      subCategory: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    placeholder="Add new"
                    className="w-48 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubCategory}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Apply the same focus:border-blue-200 to all other input fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand*
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.brand}
                onChange={(e) =>
                  setProductData({ ...productData, brand: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size* (e.g 1218 x 197 x 8)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.size}
                onChange={(e) =>
                  setProductData({ ...productData, size: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thickness*
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.thickness}
                onChange={(e) =>
                  setProductData({ ...productData, thickness: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dealer Price (DP)*
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.dp}
                onChange={(e) =>
                  setProductData({ ...productData, dp: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST (%)*
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.gst}
                onChange={(e) =>
                  setProductData({ ...productData, gst: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price (BP)*
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.bp}
                onChange={(e) =>
                  setProductData({ ...productData, bp: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Cost*
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.sampleCost}
                onChange={(e) =>
                  setProductData({ ...productData, sampleCost: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Inventory*
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.sampleInventory}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    sampleInventory: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description*
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </div>
           
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Textures*
            </label>
            <div className="space-y-4">
              {/* Texture Input Fields */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Texture Name"
                  value={textureInput.name}
                  onChange={(e) =>
                    setTextureInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={textureInput.cost}
                  onChange={(e) =>
                    setTextureInput((prev) => ({
                      ...prev,
                      cost: e.target.value,
                    }))
                  }
                  className="w-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddTexture}
                  className="px-4 py-2 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Display Added Textures */}
              <div className="grid grid-cols-1 gap-2">
                {productData.textures.map((texture, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{texture.name}</span>
                      <span className="ml-4 text-gray-600">
                        ₹{texture.cost}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTexture(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images* (Up to 4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative">
                  {productData.images[index] ? (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={productData.images[index].url}
                        alt={productData.images[index].name}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <X size={16} className="text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor={`imageUpload-${index}`}
                      className={`cursor-pointer block text-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors aspect-square flex flex-col items-center justify-center ${
                        productData.images.length >= 4
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`imageUpload-${index}`}
                        onChange={(e) => handleImageUpload(index, e)}
                        disabled={productData.images.length > 4}
                      />
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">
                        Upload Image {index + 1}
                      </p>
                    </label>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Colors (4 Hex Codes)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={productData.colors[index]}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-10 h-10 p-1 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={productData.colors[index]}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="#000000"
                      className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                      pattern="^#[0-9A-Fa-f]{6}$"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-6 md:p-8 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-lg focus:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#003f62] text-white rounded-lg focus:bg-[#003f62]/90 font-medium transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
