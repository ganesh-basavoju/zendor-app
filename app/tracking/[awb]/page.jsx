"use client";
import { useState, useEffect } from "react";
import { Search, Package, Truck, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

export default function OrderTracking({ awb }) {
  const [orderId, setOrderId] = useState(awb || "");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const getShipmentTracking = async (awb) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Username': 'bohoprocere@gmail.com',
        'Password': 'Boho@123'
      }
    };

    try {
      const response = await axios.post(
        'https://shipcorrect.com/api/trackOrder_v2.php',
        { awb },
        config
      );
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      return response.data;
    } catch (error) {
      console.error('Shipment tracking error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(error.response?.data?.error || 'Failed to track shipment');
    }
  };

  const handleTrackOrder = async (e) => {
    if (e) e.preventDefault();
    if (!orderId.trim()) {
      setError("Please enter a valid tracking number");
      return;
    }

    setLoading(true);
    setError("");
    setTrackingInfo(null);

    try {
      const trackingData = await getShipmentTracking(orderId);
      setTrackingInfo(trackingData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message || "Failed to fetch tracking information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (awb) {
      setOrderId(awb);
      handleTrackOrder();
    }
  }, [awb]);

  const getStatusColor = (status) => {
    const statusColors = {
      "Order Placed": "bg-blue-100 text-blue-800",
      "Processing": "bg-yellow-100 text-yellow-800",
      "Shipped": "bg-purple-100 text-purple-800",
      "Out for Delivery": "bg-orange-100 text-orange-800",
      "Delivered": "bg-green-100 text-green-800",
      "Cancelled": "bg-red-100 text-red-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status, isCurrent) => {
    const icons = {
      "Order Placed": <Package className="w-5 h-5" />,
      "Processing": <Loader2 className="w-5 h-5 animate-spin" />,
      "Shipped": <Truck className="w-5 h-5" />,
      "Out for Delivery": <Truck className="w-5 h-5" />,
      "Delivered": <CheckCircle className="w-5 h-5" />,
      "Cancelled": <AlertCircle className="w-5 h-5" />
    };
    
    return (
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
        {icons[status] || <Package className="w-5 h-5" />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking number to check your order status</p>
        </div>

        <form onSubmit={handleTrackOrder} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter tracking number"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tracking...
                </>
              ) : (
                "Track Order"
              )}
            </button>
          </div>
          {error && (
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <AlertCircle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}
        </form>

        {loading && !trackingInfo && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        )}

        {trackingInfo && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Order Summary */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order #{trackingInfo.orderId || orderId}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Last updated: {lastUpdated}
                  </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingInfo.status)}`}>
                  {trackingInfo.status}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="px-6 py-5">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {trackingInfo.timeline?.map((event, index) => {
                  const isCurrent = index === 0;
                  return (
                    <div key={index} className="relative pb-8">
                      <div className="relative flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          {getStatusIcon(event.status, isCurrent)}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {event.status}
                            </h3>
                            <time className="text-sm text-gray-500">
                              {event.timestamp}
                            </time>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {event.location}
                          </p>
                          {event.notes && (
                            <p className="text-sm text-gray-500 mt-1">
                              {event.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Shipper</h4>
                  <p className="text-gray-900 font-medium">{trackingInfo.from?.name}</p>
                  <p className="text-gray-600 mt-1">{trackingInfo.from?.address}</p>
                  <p className="text-gray-600">{trackingInfo.from?.city}, {trackingInfo.from?.state}</p>
                  <p className="text-gray-600">{trackingInfo.from?.country} - {trackingInfo.from?.postalCode}</p>
                  <p className="text-gray-600 mt-2">Phone: {trackingInfo.from?.phone}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Receiver</h4>
                  <p className="text-gray-900 font-medium">{trackingInfo.to?.name}</p>
                  <p className="text-gray-600 mt-1">{trackingInfo.to?.address}</p>
                  <p className="text-gray-600">{trackingInfo.to?.city}, {trackingInfo.to?.state}</p>
                  <p className="text-gray-600">{trackingInfo.to?.country} - {trackingInfo.to?.postalCode}</p>
                  <p className="text-gray-600 mt-2">Phone: {trackingInfo.to?.phone}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="px-6 py-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Shipment Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Courier</h4>
                  <p className="text-gray-900">ShipCorrect</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">AWB Number</h4>
                  <p className="text-gray-900">{orderId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Weight</h4>
                  <p className="text-gray-900">{trackingInfo.weight || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Pieces</h4>
                  <p className="text-gray-900">{trackingInfo.pieces || '1'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !trackingInfo && !error && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tracking information</h3>
            <p className="mt-1 text-gray-500">Enter your tracking number to check your order status.</p>
          </div>
        )}
      </div>
    </div>
  );
}