"use client"
import { useState, useEffect } from 'react';
import { FaSearch, FaTruck, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import axiosInstance from '@/utils/AxiosInstance';

const OrderTrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load tracking ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('tracking_id');
    if (id) {
      setTrackingId(id);
      handleTrackOrder(id);
    }
  }, []);

  const handleTrackOrder = async (id) => {
    const trackId = id || trackingId;
    if (!trackId.trim()) {
      setError('Please enter a tracking number');
      return;
    }
   
    setLoading(true);
    setError('');
    
    try {
      const response = await axiosInstance.get(`/shiprocket/track?tracking_id=${trackId}`);
      setTrackingData(response.data);
      console.log(response.data,"ship track")
      // Update URL without reload
      window.history.pushState({}, '', `?tracking_id=${trackId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tracking details');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) {
      return <FaCheckCircle className="text-green-500" />;
    } else if (statusLower.includes('cancel')) {
      return <FaTimesCircle className="text-red-500" />;
    } else if (statusLower.includes('transit') || statusLower.includes('shipped')) {
      return <FaTruck className="text-blue-500" />;
    }
    return <FaBoxOpen className="text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Order Tracking</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your shipment in real-time
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
            </div>
            <button
              onClick={() => handleTrackOrder()}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <FaSearch />
                  Track Order
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 text-red-500 text-sm">{error}</div>
          )}
        </div>

        {trackingData && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-3">
                {getStatusIcon(trackingData.status)}
                Order #{trackingData.tracking_number}
              </h2>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{trackingData.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Courier</p>
                  <p className="font-medium">{trackingData.courier_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">
                    {trackingData.estimated_delivery || 'Calculating...'}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5">
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Tracking History
              </h3>
              <div className="space-y-4">
                {trackingData.history?.length > 0 ? (
                  trackingData.history.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                        </div>
                        {index !== trackingData.history.length - 1 && (
                          <div className="h-8 w-0.5 bg-gray-200 ml-2"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {event.status}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleString()}
                        </p>
                        {event.location && (
                          <p className="text-sm text-gray-500 mt-1">
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No tracking history available
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;