"use client";
import { FaMapMarkerAlt, FaTimes, FaCheck, FaTruck } from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";
import { checkServiceability } from "@/utils/Api";

const Locationcheck = ({ onClose, onSelectLocation }) => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceability, setServiceability] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Load saved location from localStorage on initial render
  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryLocation");
    if (savedLocation) {
      try {
        const { name, pincode } = JSON.parse(savedLocation);
        setPincode(pincode);
      } catch (e) {
        console.error("Error parsing saved location:", e);
      }
    }
  }, []);

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value.slice(0, 6));
    setError("");
    setServiceability(null);
  };

  const handlePincodeSubmit = async (e, manualPincode = null) => {
    if (e.preventDefault) e.preventDefault();
    setError("");
    setServiceability(null);

    const pinToCheck = manualPincode || pincode;

    if (!pinToCheck.trim()) {
      setError("Please enter a pincode");
      return;
    }

    if (pinToCheck.length !== 6) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setIsLoading(true);

    try {
      const result = await checkServiceability(pinToCheck);
      console.log(result, "res");
      if (result.available) {
        const locationName =
          result.data.available_courier_companies[0]?.city || pinToCheck;

        setServiceability({
          available: true,
          city: locationName,
          couriers: result.data.available_courier_companies,
          estimatedDays:
            result.data.available_courier_companies[0]?.etd || "3-5 days",
        });

        // Auto-confirm if pincode came from geolocation
        if (manualPincode) {
          handleLocationSelect(locationName, pinToCheck);
        }
      } else {
        setError("Delivery not available in this area");
        setServiceability({ available: false });
      }
    } catch (err) {
      setError(err.message || "Error checking service availability");
      console.error("Serviceability check error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (name, pincode) => {
    const locationData = { name, pincode };
    // Save to localStorage for persistence across sessions
    localStorage.setItem("deliveryLocation", JSON.stringify(locationData));
    // Save to sessionStorage for current session
    sessionStorage.setItem("deliveryLocation", JSON.stringify(locationData));
    onSelectLocation(name, pincode);
    onClose();
  };

  return (
    <div className=" bg-black/40 flex z-50  duration-300 " onClick={onClose}>
      <div
        className="bg-white  w-full overflow-hidden p-1 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center flex-col items-start mb-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Enter your Delivery Pincode
          </h2>
          <p className="text-sm mt-1 text-red-400" >* Please check availability before proceed to checkout</p>
        </div>

        <div className="mb-2">
          <form onSubmit={handlePincodeSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={handlePincodeChange}
              className="flex-1 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-500 text-sm"
              maxLength={6}
              inputMode="numeric"
            />
            <button
              type="submit"
              className="bg-blue-700 cursor-pointer  text-white hover:bg-blue-400 px-6 py-2 rounded text-sm font-medium transition-colors"
              disabled={isLoading || isGettingLocation}
            >
              {isLoading ? "Checking..." : "Apply"}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {serviceability?.available && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-700 mb-2">
              <FaCheck className="mr-2" />
              <span className="font-medium">
                Delivery available to {serviceability.city}
              </span>
            </div>
            <div className="text-sm text-green-600 mb-2">
              Estimated delivery: {serviceability.estimatedDays}
            </div>
            <div className="text-xs text-gray-600">
              Available couriers:{" "}
              {serviceability.couriers?.map((c) => c.courier_name).join(", ")}
            </div>
          </div>
        )}

        {serviceability?.available === false && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-700">
            <div className="flex items-center mb-2">
              <FaTimes className="mr-2" />
              <span className="font-medium">
                Delivery not available to this pincode
              </span>
            </div>
            <div className="text-sm">
              Please try a different pincode or check back later.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locationcheck;
