"use client";
import { useState } from 'react';
import { Folder, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Categories = () => {


  const router = useRouter();
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Wallpapers', 
      itemCount: 24, 
      image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg'
    },
    { 
      id: 2, 
      name: 'Wooden Floorings', 
      itemCount: 18, 
      image: 'https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg'
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage product categories</p>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Create New Category Card */}
        

        {/* Category Cards */}
        {/* Update the onClick handler in Category Cards mapping */}
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => router.push(`/admin/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            </div>

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  
                 
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                <p className="text-white/80 mt-1">
                   products
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Categories;