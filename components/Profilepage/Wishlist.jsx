"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, X, View } from "lucide-react";
import axiosInstance from "@/utils/AxiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Modal = ({ show, onClose, title, onSubmit, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            {title === "Create New Project" ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const MoodBoard = () => {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchMoodBoards = useCallback(async () => {
    try {
      const response = await axiosInstance.get("user/get-moodBoard");
      if (response.data.success) {
        const fetchedProjects = response.data.data.map((moodBoard, index) => ({
          id: index,
          name: moodBoard.name,
          address: moodBoard.address,
          products: [],
          thumbnail:
            "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
          createdAt: new Date().toISOString(),
        }));
        setProjects(fetchedProjects);
      }
    } catch (error) {
      console.error("Error fetching moodboards:", error);
    }
  }, []);

  useEffect(() => {
    fetchMoodBoards();
  }, [fetchMoodBoards]);

  const handleCreateProject = async () => {
    if (!formData.name.trim()) return;

    try {
      const response = await axiosInstance.post("user/create-moodBoard", {
        name: formData.name,
        address: formData.address,
      });

      if (response.data.success) {
        await fetchMoodBoards();
        setFormData({ name: "", address: "" });
        setShowCreateModal(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating moodboard:", error);
      toast.error(
        error.response?.data?.message || "Failed to create moodboard"
      );
    }
  };

  const handleEditProject = async () => {
    if (!formData.name.trim() || !currentProject) return;

    try {
      const response = await axiosInstance.put("user/update-moodBoard", {
        name: currentProject.name,
        address: currentProject.address,
        formData: formData,
      });

      if (response.data.success) {
        const updatedProjects = response.data.data.map((moodBoard, index) => ({
          id: index,
          name: moodBoard.name,
          address: moodBoard.address,
          products: [],
          thumbnail:
            "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
          createdAt: new Date().toISOString(),
        }));

        setProjects(updatedProjects);
        setShowEditModal(false);
        setCurrentProject(null);
        setFormData({ name: "", address: "" });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating moodboard:", error);
      toast.error(
        error.response?.data?.message || "Failed to update moodboard"
      );
    }
  };

  const handleDeleteProject = async (projectId, projectName) => {
    try {
      const response = await axiosInstance.delete("user/delete-moodBoard", {
        data: { name: projectName },
      });

      if (response.data.success) {
        const updatedProjects = response.data.data.map((moodBoard, index) => ({
          id: index,
          name: moodBoard.name,
          address: moodBoard.address,
          products: [],
          thumbnail:
            "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
          createdAt: new Date().toISOString(),
        }));

        setProjects(updatedProjects);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting moodboard:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete moodboard"
      );
    }
  };

  const fetchMoodBoardCollection = async (projectName) => {
    try {
      const response = await axiosInstance.post(
        "user/get-moodBoard-collection",
        {
          name: projectName,
        }
      );
      console.log(response.data.data, "res");
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching moodboard collection:", error);
    }
  };

  // const handleProjectClick = (project) => {
  //   fetchMoodBoardCollection(project.name);
  // };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({ name: project.name, address: project.address });
    setShowEditModal(true);
  };

  const handleNameChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  }, []);

  const handleAddressChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  }, []);

  const [showCollectionView, setShowCollectionView] = useState(false);
  const [selectedMoodboard, setSelectedMoodboard] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedMoodboard(project);
    setShowCollectionView(true);
    fetchMoodBoardCollection(project.name);
  };
  const handleDeleteFromCollection = async (name, productId) => {
    try {
      const res = await axiosInstance.post(
        "/user/delete-From-MoodBoard-Collections",
        {
          name,
          productId,
        }
      );
      if (res.status === 200) {
        toast.success("Deleted successfully");
        setShowCollectionView(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to delete");
    }
  };
  if (showCollectionView && selectedMoodboard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setShowCollectionView(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold">
            Project Name: {selectedMoodboard.name}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products?.map((product, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group"
            >
              <Image
                src={
                  product.productType === "WoodenFloor"
                    ? product?.product.images
                    : product?.product.images[0].pic
                }
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute gap-1.5 inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    handleDeleteFromCollection(
                      selectedMoodboard.name,
                      product.productId
                    )
                  }
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  onClick={() =>
                    router.push(
                      `/products/${
                        product?.productType === "WoodenFloor"
                          ? "wooden-flooring"
                          : "wallpapers"
                      }/${product?.productId}`
                    )
                  }
                >
                  <View />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-medium truncate">
                  {product.name}
                </h3>
                <p className="text-white/80 text-sm">{product.category}</p>
              </div>
            </div>
          ))}
        </div>

        {(!products || products.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products in this collection yet
            </p>
            <p className="text-gray-400 mt-2">
              Browse products and click the heart icon to add them to this
              collection
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mood Board</h2>
          <p className="text-gray-500 mt-1">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <Plus className="text-gray-600" />
          </div>
          <span className="text-gray-600 font-medium">Create New</span>
        </button>

        {projects?.map((project) => (
          <div
            key={project.id}
            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
            onClick={(e) => {
              // Prevent click when clicking edit or delete buttons
              if (!e.target.closest("button")) {
                handleProjectClick(project);
              }
            }}
          >
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{project.name}</h3>

                  {project.products?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.products.slice(0, 3).map((product, index) => (
                        <span
                          key={index}
                          className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                        >
                          {product.name}
                        </span>
                      ))}
                      {project.products.length > 3 && (
                        <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          +{project.products.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 absolute right-4 top-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(project);
                    }}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Pencil size={16} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id, project.name);
                    }}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <Modal
          show={true}
          onClose={() => {
            setShowCreateModal(false);
            setFormData({ name: "", address: "" });
          }}
          title="Create New Project"
          onSubmit={handleCreateProject}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Address
              </label>
              <textarea
                value={formData.address}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                rows={3}
                placeholder="Enter project address"
              />
            </div>
          </div>
        </Modal>
      )}

      {showEditModal && (
        <Modal
          show={true}
          onClose={() => {
            setShowEditModal(false);
            setFormData({ name: "", address: "" });
          }}
          title="Edit Project"
          onSubmit={handleEditProject}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Address
              </label>
              <textarea
                value={formData.address}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                rows={3}
                placeholder="Enter project address"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MoodBoard;
