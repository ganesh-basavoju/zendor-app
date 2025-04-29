"use client";
import { useState, useEffect } from "react";
import {
  Printer,
  ArrowLeft,
  Download,
  User,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  Clock,
  Package,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/AxiosInstance";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const OrderDetails = ({ params }) => {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const orderId = params?.value
          ? JSON.parse(params.value).id
          : params?.id;

        if (!orderId) {
          console.error("No order ID found in params");
          return;
        }

        const response = await axiosInstance.get(
          `/orders/getOrderDetails/${orderId}`
        );
        if (response.data.success) {
          setOrderData(response.data.data);
          if (response.data.data.orderInfo.trackingNumber) {
            fetchTrackingInfo(response.data.data.orderInfo.trackingNumber);
          }
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTrackingInfo = async (trackingNumber) => {
      try {
        setTrackingLoading(true);
        const response = await axiosInstance.post("/orders/track-shipment", {
          trackingNumber,
        });
        setTrackingData(response.data);
      } catch (error) {
        console.error("Error fetching tracking info:", error);
      } finally {
        setTrackingLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params]);

  console.log(orderData);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);

      // Prepare the request data
      const updateData = {
        status: newStatus,
      };

      // Add tracking number if status is 'shipped'
      if (newStatus === "shipped") {
        updateData.trackingNumber = prompt("Enter tracking number:");
        if (!updateData.trackingNumber) {
          alert("Tracking number is required for shipped status");
          return;
        }
      }

      // Add cancellation reason if cancelling
      if (newStatus === "cancelled" || newStatus === "returned") {
        updateData.cancellationReason = prompt(`Enter ${newStatus} reason:`);
        if (!updateData.cancellationReason) {
          alert(`${newStatus} reason is required`);
          return;
        }
      }

      // Make the API request
      const response = await axiosInstance.patch(
        `/orders/updateOrderStatus/${orderData.orderInfo.id}`,
        updateData
      );

      if (response.data.success) {
        // Update local state with the new data
        setOrderData((prev) => ({
          ...prev,
          orderInfo: {
            ...prev.orderInfo,
            status: newStatus,
            trackingNumber:
              updateData.trackingNumber || prev.orderInfo.trackingNumber,
            notes: updateData.notes || prev.orderInfo.notes,
          },
          timeline: response.data.data.timeline,
        }));

        toast.success(`Order status updated to ${newStatus}`);
      } else {
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update order status. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <Package className="w-5 h-5" />;
      case "Processing":
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case "Shipped":
        return <Truck className="w-5 h-5" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003f62]"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the order you're looking for. Please check the
            order number and try again.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="px-6 py-3 bg-[#003f62] text-white rounded-lg hover:bg-[#002a44] transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <Toaster/>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Order #{orderData?.orderInfo?.trackingNumber}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  orderData.orderInfo.status
                )}`}
              >
                {orderData.orderInfo.status}
              </span>
              <span className="text-gray-500 text-sm">
                Placed on{" "}
                {new Date(orderData.orderInfo.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <select
            value={orderData.orderInfo.status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#003f62]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 font-medium text-gray-500">
                      Product
                    </th>
                    <th className="text-center pb-3 font-medium text-gray-500">
                      Qty
                    </th>
                    <th className="text-right pb-3 font-medium text-gray-500">
                      Price
                    </th>
                    <th className="text-right pb-3 font-medium text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.category==="Wallpaper"?item.image?.pic:item.images}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${item.id}`}
                              className="font-medium hover:text-[#003f62] transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              SKU: {item.sku}
                            </p>
                            {item.isSample && (
                              <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                Sample
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4">
                        {item.quantity}
                        {item.floorArea && (
                          <span className="block text-xs text-gray-500 mt-1">
                            {item.floorArea} sq.ft
                          </span>
                        )}
                      </td>
                      <td className="text-right py-4">
                        ₹{item.price.toLocaleString("en-IN")}
                      </td>
                      <td className="text-right py-4 font-medium">
                        ₹{item.total.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Totals */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₹{orderData.summary.subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {orderData.summary.shipping > 0
                    ? `₹${orderData.summary.shipping.toLocaleString("en-IN")}`
                    : "Free"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  ₹{orderData.summary.tax.toLocaleString("en-IN")}
                </span>
              </div>
              {orderData.summary.discount > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -₹{orderData.summary.discount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t mt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">
                  ₹{orderData.summary.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {orderData.orderInfo.trackingNumber && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tracking Information</h2>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {orderData.orderInfo.shippingProvider}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    Order Number or AWB
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-medium">
                      {orderData.orderInfo.trackingNumber}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          orderData.orderInfo.trackingNumber
                        );
                        toast.success("Tracking number copied to clipboard");
                      }}
                      className="text-[#003f62] hover:text-[#002a44] text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <a
                  href={`https://shipcorrect.com/tracking/${orderData.orderInfo.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#003f62] text-white rounded-lg hover:bg-[#002a44] transition-colors text-sm"
                >
                  Track on Carrier Site
                </a>
              </div>

              {trackingLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin text-[#003f62]" size={24} />
                </div>
              ) : trackingData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        trackingData.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {getStatusIcon(trackingData.status)}
                    </div>
                    <div>
                      <p className="font-medium">{trackingData.status}</p>
                      <p className="text-sm text-gray-500">
                        {trackingData.lastUpdate &&
                          new Date(trackingData.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-l-2 border-gray-200 pl-4 ml-5 space-y-4">
                    {trackingData.events.map((event, index) => (
                      <div key={index} className="relative pb-4">
                        <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[18px] top-1"></div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">
                          {event.location}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>Tracking information not available</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} />
              Customer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{orderData.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{orderData.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{orderData.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck size={20} />
              Shipping Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {orderData.shipping.address.street}
                </p>
                {orderData.shipping.address.landmark && (
                  <p className="text-gray-600">
                    Near {orderData.shipping.address.landmark}
                  </p>
                )}
                <p className="text-gray-600">
                  {orderData.shipping.address.city},{" "}
                  {orderData.shipping.address.state} -{" "}
                  {orderData.shipping.address.pinCode}
                </p>
                <p className="text-gray-600">
                  {orderData.shipping.address.country}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery Method</p>
                <p className="font-medium">{orderData.shipping.method}</p>
              </div>
              {orderData.shipping.estimatedDelivery && (
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">
                    {new Date(
                      orderData.shipping.estimatedDelivery
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Method</p>
                <p className="font-medium">{orderData.billing.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p
                  className={`font-medium ${
                    orderData.billing.status === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {orderData.billing.status}
                </p>
              </div>
              {orderData.billing.transactionId && (
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-mono text-sm">
                    {orderData.billing.transactionId}
                  </p>
                </div>
              )}
              {orderData.billing.paidAt && (
                <div>
                  <p className="text-sm text-gray-500">Paid On</p>
                  <p className="font-medium">
                    {new Date(orderData.billing.paidAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {orderData.timeline.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{step.status}</p>
                    {step.date && (
                      <p className="text-sm text-gray-500">
                        {new Date(step.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Notes */}
      {orderData.orderInfo.notes && (
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">Order Notes</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">
              {orderData.orderInfo.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
