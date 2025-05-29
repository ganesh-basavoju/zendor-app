"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromLocalStorage } from "@/utils/localStorage-util";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const Guestcart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log("guest", Guestcart);

  const token = localStorage.getItem("token");

  const fetchGuestCartItems = async () => {
    const data = loadCartFromLocalStorage();
    const res = await axiosInstance.post("/cart/get-guest-cart", {
      items: data.items,
    });
    console.log(res.data, "geuest");
    if (res.status == 200) {
      setCartItems(res.data.cart?.items);
      setTotalPrice(res.data.cart.totalAmount);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await axiosInstance.get("/cart/get-cart");
      console.log(res.data, "res  cart");
      if (res.status == 200) {
        setCartItems(res.data.cart.items);
        setTotalPrice(res.data.cart.totalAmount);
      }
    };
    if (!token) {
      fetchGuestCartItems();
    } else {
      fetchCartItems();
    }
  }, []);

  console.log("items", cartItems);

  const handleupdateQuantity = async (flag, item) => {
    try {
      if (!token) {
        dispatch(updateQuantity({ productId: item?._id, flag: flag }));
        setTimeout(() => {
          fetchGuestCartItems();
        }, 2000);
        return;
      }
      const res = await axiosInstance.put("/cart/update-quantity", {
        productId: item?._id,
        action: flag ? "increment" : "decrement",
      });
      if (res.status === 200) {
        toast.success("Quantity updated");
        setCartItems(res.data.cart.items);
        setTotalPrice(res.data.cart.totalAmount);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
      console.log(error);
    }
  };

  const removeItem = async (itemId, isSample) => {
    try {
      if (!token) {
        dispatch(removeFromCart({ id: itemId._id }));
        setTimeout(() => {
          fetchGuestCartItems();
          toast.success("Removed Successfully");
        }, 2000);

        return;
      }
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

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading cart...</div>;
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
    <div className="min-h-screen mt-10 bg-gray-50 py-12">
      <Toaster />
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Material Cart
        </h2>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <h3 className="text-base font-semibold text-gray-800">
                    Items ({cartItems.length})
                  </h3>
                  <h3 className="text-base font-semibold text-gray-800">
                    Price
                  </h3>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-24 h-32 rounded-md overflow-hidden">
                        <Image
                          // src={item.productId?.images ||item.productId?.images[0].pic}
                          src={
                            item.productType == "Wallpaper"
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
                          {item.isSample && (
                            <>
                            <p className="flex">
                              color:&nbsp;
                              <input
                                type="color"
                                value={item?.color}
                                disabled
                              />
                              </p>
                              <p>Texture:{item?.texture}</p>
                            </>
                          )}
                          <button
                            onClick={() =>
                              removeItem(item.productId, item.isSample)
                            }
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-base font-semibold">
                            ₹{(item.totalPrice || 0).toLocaleString("en-IN")}
                          </p>
                          {item.isSample && (
                            <div className="flex items-center border rounded-lg overflow-hidden bg-white mt-2">
                              <button
                                onClick={() =>
                                  handleupdateQuantity(false, item.productId)
                                }
                                className="px-3 cursor-pointer py-1 hover:bg-gray-100 transition-colors"
                              >
                                −
                              </button>
                              <span className="px-4 py-1  font-medium text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleupdateQuantity(true, item.productId)
                                }
                                className="px-3 cursor-pointer py-1 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {!item.isSample && item.floorArea && (
                      <div className="mt-4  pt-4">
                        <h4 className="font-medium mb-2">Wall Measurements</h4>
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
                                    Height: {item.floorArea[wall].height || 0}{" "}
                                    {item.size?.unit || "feet"}
                                  </p>
                                  <p>
                                    Area: {item.floorArea[wall].area || 0} sq.
                                    {item.size?.unit || "feet"}
                                  </p>
                                  <p>
                                    Price: ₹
                                    {(item.floorArea[wall].price || 0)
                                      .toFixed(2)
                                      .toLocaleString("en-IN")}
                                  </p>
                                  {item.floorArea[wall].texture && (
                                    <p>
                                      texture:
                                      {item.floorArea[wall].texture || ""}
                                    </p>
                                  )}
                                  {item.productType == "Wallpaper" && (
                                    <p className="flex">
                                      {" "}
                                      color:&nbsp;
                                      <input
                                        type="color"
                                        value={item.floorArea[wall].color}
                                        disabled
                                      />
                                    </p>
                                  )}
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

            {/* Order Summary Section */}
            <div className="lg:border-l border-gray-100 p-5 bg-gray-50">
              <div className="sticky top-6">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-2 pt-4 border-t text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>₹ 0(free delivery)</span>
                  </div>
                  {/* <div className="flex justify-between text-gray-600">
                    <span>IGST (18%)</span>
                    <span>₹{((totalPrice || 0) * 0.18).toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between text-xl font-bold pt-4 border-t">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors mt-8"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
