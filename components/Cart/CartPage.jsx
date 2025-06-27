// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import axiosInstance from "@/utils/AxiosInstance";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { loadCartFromLocalStorage } from "@/utils/localStorage-util";
// import { removeFromCart, updateQuantity } from "@/store/cartSlice";

// export default function CartPage() {

//   const [isLoading, setIsLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const Guestcart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     // Move localStorage access inside useEffect
//     setToken(localStorage.getItem("token"));
//   }, []);

//   const fetchGuestCartItems = async () => {
//     const data = loadCartFromLocalStorage();
//     const res = await axiosInstance.post("/cart/get-guest-cart", {
//       items: data.items,
//     });
//     if (res.status == 200) {
//       setCartItems(res.data.cart?.items);
//       setTotalPrice(res.data.cart.totalAmount);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       fetchGuestCartItems();
//     } else {
//       const fetchCartItems = async () => {
//         const res = await axiosInstance.get("/cart/get-cart");
//         if (res.status == 200) {
//           setCartItems(res.data.cart.items);
//           setTotalPrice(res.data.cart.totalAmount);
//         }
//       };
//       fetchCartItems();
//     }
//   }, [token]); // Add token as dependency

//   const handleupdateQuantity = async (flag, item) => {
//     try {
//       if (!token) {
//         dispatch(updateQuantity({ productId: item?._id, flag: flag }));
//         setTimeout(() => {
//           fetchGuestCartItems();
//         }, 2000);
//         return;
//       }
//       const res = await axiosInstance.put("/cart/update-quantity", {
//         productId: item?._id,
//         action: flag ? "increment" : "decrement",
//       });
//       if (res.status === 200) {
//         toast.success("Quantity updated");
//         setCartItems(res.data.cart.items);
//         setTotalPrice(res.data.cart.totalAmount);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//       console.log(error);
//     }
//   };

//   const removeItem = async (itemId, isSample) => {
//     try {
//       if (!token) {
//         dispatch(removeFromCart({ id: itemId._id }));
//         setTimeout(() => {
//           fetchGuestCartItems();
//           toast.success("Removed Successfully");
//         }, 2000);

//         return;
//       }
//       const res = await axiosInstance.post(`/cart/remove-from-cart`, {
//         productId: itemId?._id,
//         isSample,
//       });
//       if (res.status === 200) {
//         toast.success("Item removed from cart");
//         setCartItems(res.data.cart.items);
//         setTotalPrice(res.data.cart.totalAmount);
//       }
//     } catch (error) {
//       toast.error("Failed to remove item from cart");
//       console.log(error);
//     }
//   };

//   if (isLoading) {
//     return <div className="container mx-auto p-4">Loading cart...</div>;
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen container mx-auto p-4 text-center">
//         <h1 className="text-2xl font-bold mb-4 mt-30 ">Your Cart</h1>
//         <p className="mb-4">Your cart is empty</p>
//         <Link
//           href="/"
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen mt-10 bg-gray-50 py-12">
//       <Toaster />
//       <div className="container max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
//           Material Cart
//         </h2>

//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 p-5">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center pb-3 border-b border-gray-100">
//                   <h3 className="text-base font-semibold text-gray-800">
//                     Items ({cartItems.length})
//                   </h3>
//                   <h3 className="text-base font-semibold text-gray-800">
//                     Price
//                   </h3>
//                 </div>

//                 {cartItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex flex-col p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300"
//                   >
//                     <div className="flex gap-4">
//                       <div className="relative w-24 h-32 rounded-md overflow-hidden">
//                         <Image
//                           // src={item.productId?.images ||item.productId?.images[0].pic}
//                           src={
//                             item.productType == "Wallpaper"
//                               ? item.productId?.images[0].pic
//                               : item.productId?.images
//                           }
//                           alt={item.productId?.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>

//                       <div className="flex-grow flex justify-between items-start">
//                         <div className="space-y-1">
//                           <h3 className="text-lg font-medium text-gray-900">
//                             {item.productId?.name}
//                           </h3>
//                           <p className="text-gray-600 text-sm">
//                             {item.productType} -{" "}
//                             {item.isSample ? "Sample" : "Full Product"}
//                           </p>
//                           {item.isSample && item.productType == "Wallpaper" && (
//                             <>
//                               <p className="flex">
//                                 color:&nbsp;
//                                 <input
//                                   type="color"
//                                   value={item?.color}
//                                   disabled
//                                 />
//                               </p>
//                               <p>Texture:{item?.texture}</p>
//                             </>
//                           )}
//                           <button
//                             onClick={() =>
//                               removeItem(item.productId, item.isSample)
//                             }
//                             className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
//                           >
//                             Remove
//                           </button>
//                         </div>

//                         <div className="text-right">
//                           <p className="text-base font-semibold">
//                             ₹{(item.totalPrice || 0).toLocaleString("en-IN")}
//                           </p>
//                           {item.isSample && (
//                             <div className="flex items-center border rounded-lg overflow-hidden bg-white mt-2">
//                               <button
//                                 onClick={() =>
//                                   handleupdateQuantity(false, item.productId)
//                                 }
//                                 className="px-3 cursor-pointer py-1 hover:bg-gray-100 transition-colors"
//                               >
//                                 −
//                               </button>
//                               <span className="px-4 py-1  font-medium text-sm">
//                                 {item.quantity}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   handleupdateQuantity(true, item.productId)
//                                 }
//                                 className="px-3 cursor-pointer py-1 hover:bg-gray-100 transition-colors"
//                               >
//                                 +
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {!item.isSample && item.floorArea && (
//                       <div className="mt-4  pt-4">
//                         <h4 className="font-medium mb-2">Wall Measurements</h4>
//                         <div className="grid grid-cols-2 gap-4">
//                           {["wallA", "wallB", "wallC", "wallD"].map(
//                             (wall) =>
//                               item.floorArea[wall] && (
//                                 <div
//                                   key={wall}
//                                   className="bg-white p-3 rounded-lg"
//                                 >
//                                   <h5 className="font-medium">
//                                   {item.productType == "Wallpaper"
//                                       ? "Wall"
//                                       : "Floor"}{` `}{wall.slice(-1)}
//                                   </h5>
//                                   <p>
//                                     Width: {item.floorArea[wall].width || 0}{" "}
//                                     {item.size?.unit || "feet"}
//                                   </p>
//                                   <p>
//                                     Height: {item.floorArea[wall].height || 0}{" "}
//                                     {item.size?.unit || "feet"}
//                                   </p>
//                                   <p>
//                                     Area: {item.floorArea[wall].area || 0} sq.
//                                     {item.size?.unit || "feet"}
//                                   </p>
//                                   <p>
//                                     Price: ₹
//                                     {(item.floorArea[wall].price || 0)
//                                       .toFixed(2)
//                                       .toLocaleString("en-IN")}
//                                   </p>
//                                   {item.floorArea[wall].texture && (
//                                     <p>
//                                       texture:
//                                       {item.floorArea[wall].texture || ""}
//                                     </p>
//                                   )}
//                                   {item.productType == "Wallpaper" && (
//                                     <p className="flex">
//                                       {" "}
//                                       Color:&nbsp;
//                                       <input
//                                         type="color"
//                                         value={item.floorArea[wall].color}
//                                         disabled
//                                       />
//                                     </p>
//                                   )}
//                                 </div>
//                               )
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Order Summary Section */}
//             <div className="lg:border-l border-gray-100 p-5 bg-gray-50">
//               <div className="sticky top-6">
//                 <h3 className="text-xl font-bold mb-4">Order Summary</h3>
//                 <div className="space-y-2 pt-4 border-t text-sm">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{totalPrice.toLocaleString("en-IN")}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Delivery</span>
//                     <span>₹ 0(free delivery)</span>
//                   </div>
//                   {/* <div className="flex justify-between text-gray-600">
//                     <span>IGST (18%)</span>
//                     <span>₹{((totalPrice || 0) * 0.18).toFixed(2)}</span>
//                   </div> */}
//                   <div className="flex justify-between text-xl font-bold pt-4 border-t">
//                     <span>Total</span>
//                     <span>₹{totalPrice.toLocaleString("en-IN")}</span>
//                   </div>
//                 </div>

//                 <Link
//                   href={localStorage.getItem("token")?"/checkout":"/login"}
//                   className="block w-full text-center bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors mt-8"
//                 >
//                   Proceed to Checkout
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const [token, setToken] = useState("");

  useEffect(() => {
    // Move localStorage access inside useEffect
    setToken(localStorage.getItem("token"));
  }, []);

  const fetchGuestCartItems = async () => {
    const data = loadCartFromLocalStorage();
    const res = await axiosInstance.post("/cart/get-guest-cart", {
      items: data.items,
    });
    if (res.status == 200) {
      setCartItems(res.data.cart?.items);
      setTotalPrice(res.data.cart.totalAmount);
    }
  };

  useEffect(() => {
    if (!token) {
      fetchGuestCartItems();
    } else {
      const fetchCartItems = async () => {
        const res = await axiosInstance.get("/cart/get-cart");
        if (res.status == 200) {
          setCartItems(res.data.cart.items);
          setTotalPrice(res.data.cart.totalAmount);
        }
      };
      fetchCartItems();
    }
  }, [token]); // Add token as dependency

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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#012B5B] border-t-transparent"></div>
          <span className="text-gray-700 font-medium">Loading cart...</span>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-[#012B5B] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some items to your cart to get started.</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#012B5B] text-white font-medium rounded-lg hover:bg-[#01427A] transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#012B5B',
            color: 'white',
            borderRadius: '8px',
          },
        }}
      />
      
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Material Cart</h1>
          <p className="text-gray-600">Review your selected items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Items ({cartItems.length})
                  </h3>
                  <span className="text-sm text-gray-500">Price</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
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

                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.productId?.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#012B5B] text-white">
                                {item.productType}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.isSample 
                                  ? 'bg-orange-100 text-orange-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {item.isSample ? "Sample" : "Full Product"}
                              </span>
                            </div>
                            
                            {item.isSample && item.productType == "Wallpaper" && (
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <span>Color:</span>
                                  <div 
                                    className="w-4 h-4 rounded border border-gray-300" 
                                    style={{backgroundColor: item?.color}}
                                  ></div>
                                </div>
                                <div>
                                  <span>Texture: </span>
                                  <span className="font-medium">{item?.texture}</span>
                                </div>
                              </div>
                            )}
                            
                            <button
                              onClick={() => removeItem(item.productId, item.isSample)}
                              className="text-red-600 cursor-pointer hover:text-red-800 text-sm font-medium transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{(item.totalPrice || 0).toLocaleString("en-IN")}
                            </p>
                            
                            {item.isSample && (
                              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-3">
                                <button
                                  onClick={() => handleupdateQuantity(false, item.productId)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                                >
                                  −
                                </button>
                                <span className="w-10 h-8 flex items-center justify-center bg-gray-50 text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleupdateQuantity(true, item.productId)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {!item.isSample && item.floorArea && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-medium mb-4 text-gray-900">
                              {item.productType == "Wallpaper" ? "Wall" : "Floor"} Measurements
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {["wallA", "wallB", "wallC", "wallD"].map(
                                (wall) =>
                                  item.floorArea[wall] && (
                                    <div
                                      key={wall}
                                      className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                    >
                                      <h5 className="font-medium text-gray-900 mb-2">
                                        {item.productType == "Wallpaper" ? "Wall" : "Floor"} {wall.slice(-1)}
                                      </h5>
                                      <div className="space-y-1 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                          <span>Width:</span>
                                          <span>{item.floorArea[wall].width || 0} {item.size?.unit || "feet"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Height:</span>
                                          <span>{item.floorArea[wall].height || 0} {item.size?.unit || "feet"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Area:</span>
                                          <span>{item.floorArea[wall].area || 0} sq.{item.size?.unit || "feet"}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-gray-200">
                                          <span>Price:</span>
                                          <span className="font-medium text-gray-900">
                                            ₹{(item.floorArea[wall].price.toLocaleString() || 0)}
                                          </span>
                                        </div>
                                        {item.floorArea[wall].texture && (
                                          <div className="flex justify-between">
                                            <span>Texture:</span>
                                            <span>{item.floorArea[wall].texture}</span>
                                          </div>
                                        )}
                                        {item.productType == "Wallpaper" && (
                                          <div className="flex justify-between items-center">
                                            <span>Color:</span>
                                            <div 
                                              className="w-4 h-4 rounded border border-gray-300" 
                                              style={{backgroundColor: item.floorArea[wall].color}}
                                            ></div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={localStorage.getItem("token") ? "/checkout" : "/login"}
                  className="block w-full text-center bg-[#012B5B] text-white py-3 rounded-lg font-medium hover:bg-[#01427A] transition-colors duration-200 mt-6"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}