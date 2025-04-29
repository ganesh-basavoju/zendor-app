import Image from "next/image";
import { PackageCheck, Truck, Clock, Search, ChevronRight } from "lucide-react";
import { useState } from "react";

const orderStatuses = {
  pending: { icon: Clock, color: "text-amber-600 bg-amber-50" },
  delivered: { icon: PackageCheck, color: "text-green-600 bg-green-50" },
  shipped: { icon: Truck, color: "text-blue-600 bg-blue-50" }
};

export default function Orders({ userData }) {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get orders from userData
  const userOrders = userData?.orders || [];

  // Filter orders based on status and search query
  const filteredOrders = userOrders
    .filter(order => selectedStatus === "All" || order.status === selectedStatus)
    .filter(order => {
      if (!searchQuery) return true;
      return order.items?.some(item => 
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Orders</h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Track and manage your orders</p>
        </div>
        
        {/* Filter and Search Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
          >
            <option value="All">All Orders</option>
            {Object.keys(orderStatuses).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-4 sm:gap-6">
        {filteredOrders.map((order) => {
          const StatusIcon = orderStatuses[order.status?.toLowerCase()]?.icon || Clock;
          const totalItems = order.items?.length || 0;
          
          return (
            <div
              key={order._id}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                {/* Order Details */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                    <h3 className="font-medium text-gray-900">
                      Order Id:{order.trackingNumber}
                      {totalItems > 0 && ` (${totalItems} items)`}
                    </h3>
                    <span className="text-gray-900 font-medium">₹{order.totalPrice?.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <span>Payment: {order.paymentMethod}</span>
                    <span>•</span>
                    <span>{new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 pt-2">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      orderStatuses[order.status?.toLowerCase()]?.color || "text-gray-600 bg-gray-50"
                    }`}>
                      <StatusIcon size={16} />
                      <span className="text-xs sm:text-sm font-medium capitalize">{order.status}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {order.isPaid ? (
                        <span className="text-green-600 text-sm">Paid</span>
                      ) : (
                        <span className="text-red-600 text-sm">Payment Pending</span>
                      )}
                      <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                        Track Order
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="text-sm text-gray-500 pt-2 border-t">
                    <p>Shipping to: {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                    <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <PackageCheck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery 
              ? "Try adjusting your search or filter" 
              : "Start shopping to see your orders here"}
          </p>
        </div>
      )}
    </div>
  );
}
