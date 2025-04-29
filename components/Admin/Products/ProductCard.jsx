"use client";
import { useRouter } from 'next/navigation';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProductCard = ({ product, onDelete,category }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => router.push(`/admin/products/${category}/${product.id}`)}
    >
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price</span>
            <span className="font-medium text-[#003f62]">{product.price}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Stock</span>
            <span className="text-sm">{product.stock} units</span>
          </div>
          <div className="pt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#003f62]" 
                style={{ width: `${(product.remaining / product.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;