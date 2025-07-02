"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});
import {
  CreditCard,
  Wallet,
  Check,
  Plus,
  X,
  Trash2,
  MapPin,
  User,
  Package,
} from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/utils/AxiosInstance";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Input } from "@mui/material";
import Locationcheck from "@/components/Cart/Locationcheck";

export default function Checkout() {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const userName = useSelector((state) => state.user.name);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [totalAfterCoupon, setTotalAfterCoupon] = useState(0);
  const [couponId, setCouponId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleCouponApply = async () => {
    try {
      const res = await axiosInstance.post("/coupons/apply", {
        code: couponCode,
        cartTotal: totalPrice,
      });

      console.log(res, "res");
      if (res.status == 200) {
        // toast.success(res.data.message);
        setIsCouponApplied(true);
        setDiscount(res.data.discount);
        setTotalAfterCoupon(res.data.finalAmount);
        setCouponId(res.data.couponId);
        toast.success("Coupon applied successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchCartItems = async () => {
    const res = await axiosInstance.get("/cart/get-cart");
    console.log(res.data, "res  cart");
    if (res.status == 200) {
      setCartItems(res.data.cart.items);
      setTotalPrice(res.data.cart.totalAmount);
      setTax(res.data.cart.totalAmount * 0.18);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/user/get-addresses");
      const { billingAddress, shippingAddress } = res.data;

      console.log("address", res.data);

      // Clear existing addresses first
      setAddresses([]);

      // Create a Set to track unique addresses
      const uniqueAddresses = new Set();

      if (shippingAddress) {
        // Create a unique key for the address using relevant fields
        const addressKey = `${shippingAddress.Street}-${shippingAddress.City}-${shippingAddress.PinCode}`;

        if (!uniqueAddresses.has(addressKey)) {
          uniqueAddresses.add(addressKey);
          setAddresses((prev) => [
            ...prev,
            {
              ...shippingAddress,
              type: shippingAddress.isHome ? "Home" : "Office" || "Home",
            },
          ]);
        }
        if (billingAddress?.isFilled) {
          // Create a unique key for the address using relevant fields
          const addressKey = `${billingAddress.Street}-${billingAddress.City}-${billingAddress.PinCode}`;

          if (!uniqueAddresses.has(addressKey)) {
            uniqueAddresses.add(addressKey);
            setAddresses((prev) => [
              ...prev,
              {
                ...billingAddress,
                type: billingAddress.isHome ? "Home" : "Office" || "Home",
              },
            ]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    email: "",
    Street: "",
    City: "",
    State: "",
    PinCode: "",
    Landmark: "",
    country: "India",
  });

  const handleAddressSave = async () => {
    try {
      console.log(formData, "formData");
      setAddresses((prev) => [...prev, { ...formData, type: "Home" }]);
      setShowAddressForm(false);
      toast.success("Address saved successfully");
    } catch (error) {
      toast.error("Failed to save address");
      console.log(error);
    }
  };

  const removeItem = async (itemId, isSample) => {
    try {
      const res = await axiosInstance.post(`/cart/remove-from-cart`, {
        productId: itemId?._id,
        isSample,
      });
      if (res.status === 200) {
        toast.success("Item removed from cart");
        setCartItems(res.data.cart.items);
        setTotalPrice(res.data.cart.totalAmount);
      }
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.log(error);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      // Validate address fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "City",
        "PinCode",
        "Street",
      ];

      const selectedAddress = addresses[selectedAddressIndex];

      for (const field of requiredFields) {
        if (!selectedAddress[field] || selectedAddress[field].trim() === "") {
          toast.error(`Please fill the ${field} field in shipping address`);
          return;
        }
      }

      // Create order first
      const orderResponse = await axiosInstance.post("/payments/create-order", {
        amount:
          (isCouponApplied
            ? Math.ceil(totalAfterCoupon)
            : Math.ceil(totalPrice + tax)) * 100, // Convert to paise
        currency: "INR",
      });

      if (!orderResponse.data.success) {
        toast.error("Could not create order. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_qtfHIjOyxlQnr5",
        amount: isCouponApplied
          ? Math.ceil(totalAfterCoupon)
          : Math.ceil(totalPrice + tax),
        currency: "INR",
        name: "Zendor",
        description: "Order Payment",
        image: "https://i.ibb.co/WvMk7BFM/image.png",
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          try {
            const verificationResponse = await axiosInstance.post(
              "/payments/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verificationResponse.data.success) {
              // Prepare order data
              const orderData = {
                shippingAddress: {
                  firstName: selectedAddress.firstName,
                  lastName: selectedAddress.lastName,
                  companyName: selectedAddress.companyName || "",
                  email: selectedAddress.email,
                  phone: selectedAddress.phone,
                  Street: selectedAddress.Street,
                  Landmark: selectedAddress.Landmark || "",
                  City: selectedAddress.City,
                  State: selectedAddress.State,
                  PinCode: selectedAddress.PinCode,
                  country: selectedAddress.country || "India",
                  isHome: selectedAddress.isHome !== false,
                },
                paymentMode: "Prepaid",
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                itemsPrice: totalPrice,
                taxPrice: tax,
                shippingPrice: 0,
                totalPrice: Math.ceil(totalPrice + tax),
                items: cartItems.map((item) => ({
                  productId: item.productId,
                  productType: item.productType,
                  productName: item.name,
                  productThumbnail: item.thumbnail,
                  isSample: item.isSample,
                  quantity: item.quantity,
                  size: item.size,
                  floorArea: item.floorArea,
                  pricePerUnit: item.price,
                  totalPrice: item.totalPrice,
                })),
                coupon: couponCode,
                isCouponApplied: isCouponApplied,
                discount: discount,
                totalAfterCoupon: totalAfterCoupon,
                couponId: couponId,
              };

              const orderRes = await axiosInstance.post(
                "/orders/create-order",
                orderData
              );

              if (orderRes.data.success) {
                setShowConfetti(true);
                toast.success("Order placed successfully");
                setTimeout(() => {
                  setShowConfetti(false);
                  router.push(`/`);
                }, 3000);
              } else {
                toast.error(orderRes.data.message || "Order creation failed");
              }
            } else {
              toast.error(
                verificationResponse.data.message ||
                  "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Payment processing error:", error);
            toast.error(
              error.response?.data?.message ||
                "Error processing your order. Please contact support."
            );
          }
        },
        prefill: {
          name: `${selectedAddress.firstName} ${selectedAddress.lastName}`,
          email: selectedAddress.email,
          contact: selectedAddress.phone,
        },
        notes: {
          address: `${selectedAddress.Street}, ${selectedAddress.City}`,
        },
        theme: {
          color: "#012B5B",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Failed to initialize payment. Please try again.");
    }
  };

  const handleCODOrder = async () => {
    try {
      // Validate address fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "State",
        "City",
        "PinCode",
        "Street",
      ];

      const selectedAddress = addresses[selectedAddressIndex];

      // Validate required fields
      for (const field of requiredFields) {
        if (!selectedAddress[field] || selectedAddress[field].trim() === "") {
          toast.error(`Please fill the ${field} field in shipping address`);
          return;
        }
      }

      // Validate email format
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          selectedAddress.email
        )
      ) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Validate phone number
      if (!/^[0-9]{10}$/.test(selectedAddress.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }

      // Validate PIN code
      if (!/^[1-9][0-9]{5}$/.test(selectedAddress.PinCode)) {
        toast.error("Please enter a valid 6-digit PIN code");
        return;
      }

      // Prepare complete order data
      const orderData = {
        shippingAddress: {
          firstName: selectedAddress.firstName,
          lastName: selectedAddress.lastName,
          companyName: selectedAddress.companyName || "",
          email: selectedAddress.email,
          phone: selectedAddress.phone,
          Street: selectedAddress.Street,
          Landmark: selectedAddress.Landmark || "",
          City: selectedAddress.City,
          State: selectedAddress.State,
          PinCode: selectedAddress.PinCode,
          country: selectedAddress.country || "India",
          isHome: selectedAddress.isHome !== false,
        },
        paymentMode: "COD",
        itemsPrice: totalPrice,
        taxPrice: tax,
        shippingPrice: 0,
        totalPrice: Math.ceil(totalPrice + tax),
        items: cartItems.map((item) => ({
          productId: item.productId,
          productType: item.productType,
          productName: item.name,
          productThumbnail: item.images,
          isSample: item.isSample,
          quantity: item.quantity,
          size: item.size,
          floorArea: item.floorArea,
          pricePerUnit: item.price,
          totalPrice: item.totalPrice,
        })),
        coupon: couponCode,
        isCouponApplied: isCouponApplied,
        discount: discount,
        totalAfterCoupon: totalAfterCoupon,
        couponId: couponId,
      };
      console.log(orderData, "orderData");

      // Create order
      const response = await axiosInstance.post(
        "/orders/create-order",
        orderData
      );

      if (response.data.success) {
        setShowConfetti(true);
        toast.success("COD order placed successfully!");
        setTimeout(() => {
          setShowConfetti(false);
          router.push(`/`);
        }, 3000);
      } else {
        toast.error(response.data.message || "Failed to place COD order");
      }
    } catch (error) {
      console.error("COD order error:", error);
      toast.error(
        error.response?.data?.message ||
          "Error placing COD order. Please try again."
      );
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddressIndex(address);
    setSelectedAddress(address);
  };

  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  useEffect(() => {
    const loadRazorpay = async () => {
      if (window.Razorpay) {
        setIsRazorpayReady(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setIsRazorpayReady(true);
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const [flag, setFlag] = useState("");

  const handlePayment = () => {
    setFlag(true);
    if (!paymentMethod) {
      setFlag(false);
      toast.error("Please select a payment method");
      return;
    }

    if (paymentMethod === "razorpay") {
      if (!isRazorpayReady) {
        setFlag(false);
        toast.error(
          "Payment gateway is loading. Please try again in a moment."
        );
        return;
      }
      handleRazorpayPayment();
      setFlag(false);
    } else if (paymentMethod === "cod") {
      handleCODOrder();
      setFlag(false);
    }
  };

  if (userName == null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">Please login to access this page</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#012B5B] text-white font-medium rounded-lg hover:bg-[#01427A] transition-colors duration-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">Add some items to get started</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#012B5B] text-white font-medium rounded-lg hover:bg-[#01427A] transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen -mt-18 bg-gray-50 pt-16 md:pt-20">
      {showConfetti && (
        <div className="fixed inset-0 z-50">
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={500}
            recycle={true}
            run={showConfetti}
            tweenDuration={1000}
            gravity={0.2}
            initialVelocityY={20}
            confettiSource={{
              x: windowSize.width / 2,
              y: 0,
              w: 0,
              h: 0,
            }}
            colors={[
              "#012B5B",
              "#EAA451",
              "#ffffff",
              "#000000",
              "#FFD700",
              "#87CEEB",
            ]}
          />
        </div>
      )}
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-4 md:mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#012B5B] text-center">
            Checkout Page
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Order Summary (now appears first on mobile) */}
          <div className="w-full lg:w-[60%] space-y-6">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={
                          item.productType === "Wallpaper"
                            ? item.productId?.images[0].pic
                            : item.productId?.images
                        }
                        alt={item.productId?.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.productId?.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {item.productType}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.isSample
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {item.isSample ? "Sample" : "Full Product"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg md:text-xl font-bold text-gray-900">
                            ₹
                            {Math.ceil(item.totalPrice).toLocaleString("en-IN")}
                          </p>
                          {item.isSample && (
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.productId, item.isSample)
                        }
                        className="flex items-center cursor-pointer gap-2 mt-3 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Item
                      </button>
                    </div>
                  </div>

                  {!item.isSample && item.floorArea && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Wall Measurements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["wallA", "wallB", "wallC", "wallD"].map(
                          (wall) =>
                            item.floorArea[wall] && (
                              <div
                                key={wall}
                                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                              >
                                <h5 className="font-medium text-gray-900 mb-2">
                                  Wall {wall.slice(-1)}
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Width:
                                    </span>
                                    <span className="font-medium">
                                      {item.floorArea[wall].width || 0}{" "}
                                      {item.size?.unit || "feet"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Height:
                                    </span>
                                    <span className="font-medium">
                                      {item.floorArea[wall].height || 0}{" "}
                                      {item.size?.unit || "feet"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Area:</span>
                                    <span className="font-medium">
                                      {item.floorArea[wall].area || 0} sq.
                                      {item.size?.unit || "feet"}
                                    </span>
                                  </div>
                                  {item.floorArea[wall].color &&
                                    item.productType === "Wallpaper" && (
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                          Color:
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span
                                            className="w-6 h-6 rounded-sm border border-gray-300"
                                            style={{
                                              backgroundColor:
                                                item.floorArea[wall].color,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  {item.productType === "Wallpaper" &&
                                    item.floorArea[wall].texture && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Texture:
                                        </span>
                                        <span className="font-medium">
                                          {item.floorArea[wall].texture}
                                        </span>
                                      </div>
                                    )}
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Price:
                                    </span>
                                    <span className="font-medium">
                                      ₹
                                      {(
                                        item.floorArea[wall].price || 0
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Address & Payment (appears second on mobile) */}
          <div className="w-full lg:w-[40%] space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 ${
                      selectedAddress != null
                        ? "bg-green-100 text-green-600"
                        : "bg-[#012B5B] text-white"
                    } rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    {selectedAddress != null ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <span className="text-sm font-semibold">1</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-gray-900">
                      Delivery Address & Shipping Charges
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600">
                      Choose your delivery location
                    </p>
                  </div>
                </div>
                <Locationcheck />
                <div className="space-y-3 md:space-y-4">
                  {addresses.map((address, id) => (
                    <div
                      key={id}
                      onClick={() => {
                        handleAddressSelect(id);
                      }}
                      className={`border rounded-lg md:rounded-xl p-3 md:p-4 cursor-pointer transition-all ${
                        selectedAddressIndex === id
                          ? "border-[#012B5B] bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-sm md:text-base font-medium text-gray-900">
                              {address.firstName} {address.lastName}
                            </h3>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {address.type}
                            </span>
                            {/* {selectedAddressIndex === id && (
                             <button
                             onClick={() => {
                               setSelectedAddressIndex(null);
                               setShowAddressForm(true);
                             }}
                             className="text-xs md:text-sm cursor-pointer text-[#012B5B] hover:text-[#01427A] font-medium mt-1"
                           >
                             Unselect & Change Address
                           </button>
                            )} */}
                          </div>

                          <p className="text-xs md:text-sm text-gray-600 mb-1">
                            {address.Street}, {address.City}, {address.State},{" "}
                            {address.country} - {address.PinCode}
                          </p>
                          <div className="grid grid-cols-1 gap-1 text-xs md:text-sm text-gray-600">
                            <p>📞 {address.phone}</p>
                            <p>✉️ {address.email}</p>
                            {address.Landmark && <p>📍 {address.Landmark}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setSelectedAddressIndex(null);
                      setShowAddressForm(true);
                    }}
                    className="flex cursor-pointer items-center justify-center gap-2 w-full py-2 md:py-3 text-[#012B5B] hover:text-[#01427A] font-medium text-sm md:text-base border-2 border-dashed border-gray-300 hover:border-[#012B5B] rounded-lg md:rounded-xl"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    Add New Address
                  </button>
                </div>

                {/* Selected Address */}
                <div className="bg-gray-50 rounded-lg md:rounded-xl mt-3 p-4 border border-gray-200">
                  <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
                    Selected Delivery Address
                  </h2>
                  {selectedAddressIndex !== null &&
                  addresses[selectedAddressIndex] ? (
                    <div className="space-y-2">
                      <p className="text-xs md:text-sm font-medium text-gray-900">
                        {addresses[selectedAddressIndex].firstName}{" "}
                        {addresses[selectedAddressIndex].lastName}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        {addresses[selectedAddressIndex].Street},{" "}
                        {addresses[selectedAddressIndex].City},{" "}
                        {addresses[selectedAddressIndex].State} -{" "}
                        {addresses[selectedAddressIndex].PinCode}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Phone: {addresses[selectedAddressIndex].phone}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Email: {addresses[selectedAddressIndex].email}
                      </p>
                      <button
                        onClick={() => {
                          setSelectedAddressIndex(null);
                          setShowAddressForm(true);
                        }}
                        className="text-xs md:text-sm cursor-pointer text-[#012B5B] hover:text-[#01427A] font-medium mt-1"
                      >
                        Unselect & Change Address
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-600">
                      No address selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#012B5B] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-gray-900">
                      Payment Options
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600">
                      Choose your preferred payment method
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 border border-gray-200 mb-4">
                  <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
                    Price Details
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span className="font-medium">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Delivery Charges</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">
                        ₹{Math.ceil(tax).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between text-sm md:text-base font-semibold">
                        <span className="text-sm font-medium">
                          Total Amount
                        </span>
                        <span className="text-[#012B5B]">
                          ₹{Math.ceil(totalPrice + tax).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    {isCouponApplied && (
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <span className="text-sm my-1 text-green-500">
                          Coupon Apllied Successfully: {couponCode}
                        </span>

                        <div className="flex justify-between text-sm md:text-base font-semibold">
                          <span>Discount:</span>
                          <span className="text-[#012B5B]">
                            ₹{Math.ceil(discount).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm md:text-base font-semibold">
                          <span>Final Amount To Be Paid</span>
                          <span className="text-[#012B5B]">
                            ₹
                            {Math.ceil(totalAfterCoupon).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    {!isCouponApplied && (
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <span className="text-[#012B5B]">Coupon:</span>
                        <Input
                          type="text"
                          placeholder="Enter Coupon Code"
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                          onClick={handleCouponApply}
                          // onClick={applyCoupon}
                          className={`
                        mt-2  bg-[#012B5B] text-white py-2 px-4 rounded-md  transition-colors duration-200
                        ${
                          couponCode === null
                            ? "bg-gray-400 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        >
                          Apply Coupon
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-4">
                  <div
                    className={`flex items-start gap-3 p-3 md:p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === "razorpay"
                        ? "border-[#012B5B] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("razorpay")}
                  >
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">
                        Pay with Razorpay
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        Secure payment via Credit/Debit Card, UPI, or Net
                        Banking
                      </p>
                    </div>
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                      {paymentMethod === "razorpay" && (
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-[#012B5B] rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3 p-3 md:p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-[#012B5B] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">
                        Cash on Delivery
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        Pay in cash when your order arrives
                      </p>
                    </div>
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                      {paymentMethod === "cod" && (
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-[#012B5B] rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!paymentMethod || selectedAddressIndex === null}
                    className={`w-full py-3 px-4 text-white font-medium rounded-lg transition-all ${
                      !paymentMethod || selectedAddressIndex === null
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#012B5B] hover:bg-[#01427A]"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        Processing...
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    ) : paymentMethod === "razorpay" ? (
                      `Pay ₹${(isCouponApplied
                        ? Math.ceil(totalAfterCoupon)
                        : Math.ceil(totalPrice + tax)
                      ).toLocaleString("en-IN")}`
                    ) : (
                      "Place Order (Cash on Delivery)"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Add New Address
              </h3>
              <button
                onClick={() => setShowAddressForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              className="space-y-3 md:space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddressSave();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.Street}
                  onChange={(e) =>
                    setFormData({ ...formData, Street: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.City}
                    onChange={(e) =>
                      setFormData({ ...formData, City: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.State}
                    onChange={(e) =>
                      setFormData({ ...formData, State: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.PinCode}
                    onChange={(e) =>
                      setFormData({ ...formData, PinCode: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={formData.Landmark}
                    onChange={(e) =>
                      setFormData({ ...formData, Landmark: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-[#012B5B] focus:border-[#012B5B]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 cursor-pointer py-2 md:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 cursor-pointer md:py-3 bg-[#012B5B] text-white font-medium rounded-lg hover:bg-[#01427A] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Address"}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                * We won't save this address to your address book
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
