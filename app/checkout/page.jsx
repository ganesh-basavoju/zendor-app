"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Check } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/utils/AxiosInstance";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export default function Checkout() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(2);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);

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

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/user/get-addresses");
      const { billingAddress, shippingAddress } = res.data;

      console.log("address", res.data);

      // Clear existing addresses first
      setAddresses([]);

      // Create a Set to track unique addresses
      const uniqueAddresses = new Set();

      if (shippingAddress?.isFilled) {
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
      // sampleAddresses.push(formData);
      console.log(formData, "formData");
      setAddresses((prev) => [...prev, { ...formData, type: "Home" }]);
      // console.log(sampleAddresses, "sampleAddresses");
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

  const handleRazorpayPayment = () => {
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

    const options = {
      //key: "rzp_live_UPGjFs1QXCHtCV",
      key: "rzp_test_qtfHIjOyxlQnr5",
      amount: Math.ceil(totalPrice + tax) * 100,
      currency: "INR",
      name: "Zendor",
      description: "Order Payment",
      image: "https://i.ibb.co/WvMk7BFM/image.png",
      handler: async function (response) {
        try {
          // Verify payment first
          const verificationResponse = await axiosInstance.post(
            "/payments/verify-payment",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verificationResponse.status === 200) {
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
              paymentMode: "Prepaid",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              itemsPrice: totalPrice,
              taxPrice: tax,
              shippingPrice: 0, // Or calculate if needed
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
            };

            // Create order with all required data
            const orderRes = await axiosInstance.post(
              "/orders/create-order",
              orderData
            );

            if (orderRes.data.success) {
              toast.success("Order placed successfully");
              // Clear cart or perform other success actions
              router.push(`/orders/${orderRes.data.data.orderId}?success=true`);
            } else {
              toast.error(orderRes.data.message || "Order creation failed");
            }
          } else {
            toast.error(
              verificationResponse.data.message || "Payment verification failed"
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
        color: "#003f62",
      },
      modal: {
        ondismiss: function () {
          document.body.style.overflow = "scroll";
        },
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.error("Razorpay SDK failed to load. Please try again.");
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
        shippingPrice: 0, // Or calculate if needed
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
      };
      console.log(orderData, "orderData");

      // Create order
      const response = await axiosInstance.post(
        "/orders/create-order",
        orderData
      );

      if (response.data.success) {
        toast.success("COD order placed successfully!");

        // Redirect to order confirmation page
        router.push(`/`);
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

  const handleStepClick = (step) => {
    if (step === 1) return; // Login step is always completed
    if (step === 2) setActiveStep(2);
    if (step === 3 && selectedAddress !== null) setActiveStep(3);
    if (step === 4 && selectedAddress !== null) setActiveStep(4);
  };
  console.log("selected", selectedAddress);
  const handleAddressSelect = (address) => {
    setSelectedAddressIndex(address);
    setSelectedAddress(address);
    setActiveStep(3);
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

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (paymentMethod === "razorpay") {
      if (!isRazorpayReady) {
        toast.error(
          "Payment gateway is loading. Please try again in a moment."
        );
        return;
      }
      handleRazorpayPayment();
    } else if (paymentMethod === "cod") {
      handleCODOrder();
    }
  };

  console.log(activeStep, "activeStep");

  if (userName == null) {
    return (
      <div className="min-h-screen container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 mt-30 ">Access Denied</h1>
        <p className="mb-4">Login to access this page</p>
        <Link
          href="/login"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login page
        </Link>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 mt-30 ">Your Cart</h1>
        <p className="mb-4">Your cart is empty</p>
        <Link
          href="/"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Toaster />
      <h2 className="text-center capitalize  font-bold text-2xl  text-blue-700">
        Checkout page
      </h2>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}

          <div className="flex-grow space-y-4">
            {/* Login Section */}
            <div
              className="bg-white rounded-lg p-4 cursor-pointer"
              onClick={() => handleStepClick(1)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                    <Check size={16} />
                  </span>
                  <h2 className="font-semibold">LOGIN</h2>
                </div>
              </div>
              <div className="mt-2 text-gray-700">
                <p className="p-2">
                  Logged as {userName}-{userEmail}
                </p>
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className=" mt-2 p-0 flex items-center cursor-pointer gap-2 text-blue-500"
                >
                  Login with Another Account
                </Button>
              </div>
            </div>

            {/* Delivery Address Section */}
            <div
              className={`bg-white rounded-lg p-4 cursor-pointer ${
                activeStep < 2 ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 ${
                      selectedAddress != null ? "bg-green-500" : "bg-blue-500"
                    } text-white rounded-full flex items-center justify-center text-sm`}
                  >
                    {selectedAddress != null ? <Check size={16} /> : "2"}
                  </span>
                  <h2 className="font-semibold">DELIVERY ADDRESS</h2>
                  
                </div>
                
              </div>
              
              {activeStep >= 2 && (
                <>
                <p className="pb-1">
                  Select a Address from below
                </p>
                  {addresses.map((address, id) => (
                    <div
                      key={id}
                      onClick={() => {
                        handleAddressSelect(id);
                        setActiveStep(3);
                      }}
                      className={`border rounded-lg p-4 mb-4 ${
                        selectedAddressIndex === id && "border-blue-400"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-medium">
                              {address.firstName} {address.lastName}
                            </h3>
                            <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                              {address.type} - {address.addressType}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.Street}, {address.City}, {address.State},
                            {address.country} - {address.PinCode}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Email: {address.email}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Landmark: {address.Landmark}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center cursor-pointer gap-2 text-blue-500"
                  >
                    <span>+ Add a new address</span>
                  </button>
                </>
              )}
            </div>

            {/* Order Summary Section */}
            <div
              className={`bg-white rounded-lg p-4 cursor-pointer ${
                activeStep < 3 ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 ${
                      activeStep > 3 ? "bg-green-500" : "bg-blue-500"
                    } text-white rounded-full flex items-center justify-center text-sm`}
                  >
                    {activeStep >= 3 ? <Check size={16} /> : "3"}
                  </span>
                  <h2 className="font-semibold">ORDER SUMMARY</h2>
                </div>
              </div>

              {activeStep >= 3 && (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 rounded-md overflow-hidden">
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

                          <div className="flex-grow flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {item.productId?.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {item.productType} -{" "}
                                {item.isSample ? "Sample" : "Full Product"}
                              </p>
                              <button
                                onClick={() =>
                                  removeItem(item.productId, item.isSample)
                                }
                                className="text-red-500 cursor-pointer hover:text-red-700 text-sm font-medium transition-colors"
                              >
                                Remove
                              </button>
                            </div>

                            <div className="text-left">
                              <p className="text-base font-semibold">
                                ₹
                                {Math.ceil(item.totalPrice).toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              {item.isSample ? (
                                <span className=" py-1 font-medium text-sm">
                                  Qty:{item.quantity}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>

                        {!item.isSample && item.floorArea && (
                          <div className="mt-4  pt-4">
                            <h4 className="font-medium mb-2">
                              Wall Measurements
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {["wallA", "wallB", "wallC", "wallD"].map(
                                (wall) =>
                                  item.floorArea[wall] && (
                                    <div
                                      key={wall}
                                      className="bg-white p-3 rounded-lg"
                                    >
                                      <h5 className="font-medium">
                                        Wall {wall.slice(-1)}
                                      </h5>
                                      <p>
                                        Width: {item.floorArea[wall].width || 0}{" "}
                                        {item.size?.unit || "feet"}
                                      </p>
                                      <p>
                                        Height:{" "}
                                        {item.floorArea[wall].height || 0}{" "}
                                        {item.size?.unit || "feet"}
                                      </p>
                                      <p>
                                        Area: {item.floorArea[wall].area || 0}{" "}
                                        sq.
                                        {item.size?.unit || "feet"}
                                      </p>
                                      <p>
                                        Price: ₹
                                        {(
                                          item.floorArea[wall].price || 0
                                        ).toLocaleString("en-IN")}
                                      </p>
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="lg:border-l border-gray-100 p-5 bg-gray-50">
                      <div className="sticky top-6">
                        <h3 className="text-xl font-bold mb-4">
                          Order Summary
                        </h3>
                        <div className="space-y-2 pt-4 border-t text-sm">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Delivery</span>
                            <span>₹ 0(free delivery)</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Tax</span>
                            <span>
                              ₹ {Math.ceil(tax).toLocaleString("en-IN")}
                            </span>
                          </div>

                          <div className="flex justify-between text-xl font-bold pt-4 border-t">
                            <span>Total</span>
                            <span>
                              ₹
                              {Math.ceil(totalPrice + tax).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedAddress !== null) {
                        setActiveStep(4);
                      } else {
                        toast.error("Please select a delivery address");
                      }
                    }}
                    className="cursor-pointer w-full py-2 bg-blue-600 text-white rounded-lg mt-4"
                  >
                    Continue to Payment
                  </button>
                </>
              )}
            </div>

            {/* Payment Section */}
            <div
              className={`bg-white rounded-lg p-4 cursor-pointer ${
                activeStep < 4 ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                    4
                  </span>
                  <h2 className="font-semibold">PAYMENT OPTIONS</h2>
                </div>
              </div>

              {activeStep === 4 && (
                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
                      paymentMethod === "razorpay"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("razorpay")}
                  >
                    <div className="p-2 bg-blue-100 rounded-full">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Pay with Razorpay
                      </h3>
                      <p className="text-sm text-gray-600">
                        Secure payment via Credit/Debit Card, UPI, or Net
                        Banking
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 ${
                      paymentMethod === "cod"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="p-2 bg-green-100 rounded-full">
                      <Wallet className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-600">
                        Pay in cash when your order arrives
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!paymentMethod || isLoading}
                    className={`w-full py-3 px-4 text-white rounded-lg font-medium transition-all duration-200 ${
                      !paymentMethod || isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        Processing... <span className="animate-spin">⌛</span>
                      </span>
                    ) : paymentMethod === "razorpay" ? (
                      `Pay ₹ ${Math.ceil(totalPrice + tax)}`
                    ) : (
                      "Cash on Delivery"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Price Details */}
          <div className="lg:w-80 mt-2">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <h2 className="font-semibold mb-4">PRICE DETAILS</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="flex justify-between font-semibold pt-3 border-t">
                  <span>Order Amount</span>
                  <span>₹{Math.ceil(totalPrice).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t">
                  <span>Total Amount</span>
                  <span>
                    ₹{Math.ceil(tax + totalPrice).toLocaleString("en-IN")}{" "}
                    (inclusion of tax)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>

            <form className="space-y-4" onSubmit={handleAddressSave}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Company Name (Optional)"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Street Address *"
                value={formData.Street}
                onChange={(e) =>
                  setFormData({ ...formData, Street: e.target.value })
                }
                className="border p-2 rounded w-full"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City *"
                  value={formData.City}
                  onChange={(e) =>
                    setFormData({ ...formData, City: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="State *"
                  value={formData.State}
                  onChange={(e) =>
                    setFormData({ ...formData, State: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="PIN Code *"
                  value={formData.PinCode}
                  onChange={(e) =>
                    setFormData({ ...formData, PinCode: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Landmark"
                  value={formData.Landmark}
                  onChange={(e) =>
                    setFormData({ ...formData, Landmark: e.target.value })
                  }
                  className="border p-2 rounded"
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Address"}
                </button>
              </div>
              <span className="text-blue-500">
                * We wont save this address to your address book
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
