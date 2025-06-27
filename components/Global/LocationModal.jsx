"use client"
import { FaMapMarkerAlt, FaTimes, FaCheck, FaTruck } from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";
import { checkServiceability } from "@/utils/Api";

const LocationModal = ({ onClose, onSelectLocation }) => {
  
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceability, setServiceability] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Load saved location from localStorage on initial render
  useEffect(() => {
    const savedLocation = localStorage.getItem('deliveryLocation');
    if (savedLocation) {
      try {
        const { name, pincode } = JSON.parse(savedLocation);
        setPincode(pincode);
        // Optionally pre-check serviceability for saved location
        // handlePincodeSubmit({ preventDefault: () => {} }, pincode);
      } catch (e) {
        console.error("Error parsing saved location:", e);
      }
    }
  }, []);

  const cities = useMemo(() => [
    { name: "Mumbai", pincode: "400017" },
    { name: "Pune", pincode: "411001" },
    { name: "Hyderabad", pincode: "500001" },
    { name: "Bengaluru", pincode: "560001" },
    { name: "Chennai", pincode: "600001" },
    { name: "Delhi", pincode: "110001" },
    { name: "Ahmedabad", pincode: "380001" },
  ], []);

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPincode(value.slice(0, 6));
    setError("");
    setServiceability(null);
  };

  const getLocationFromBrowser = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    setError("");
    setUserLocation(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch location details');
          }

          const data = await response.json();
          const postcode = data.address?.postcode;

          if (postcode) {
            setPincode(postcode);
            await handlePincodeSubmit({ preventDefault: () => {} }, postcode);
          } else {
            setError("Could not determine pincode from your location");
          }
        } catch (err) {
          setError("Failed to fetch location details");
          console.error("Geolocation error:", err);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (err) => {
        let errorMessage = "Unable to retrieve your location";
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable permissions.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "The request to get location timed out.";
            break;
        }
        setError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
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
      
      if (result.available) {
        const selectedCity = cities.find((city) => city.pincode === pinToCheck);
        const locationName = selectedCity ? selectedCity.name : result.data.available_courier_companies[0]?.city || pinToCheck;
        
        setServiceability({
          available: true,
          city: locationName,
          couriers: result.data.available_courier_companies,
          estimatedDays: result.data.available_courier_companies[0]?.etd || '3-5 days'
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
    localStorage.setItem('deliveryLocation', JSON.stringify(locationData));
    // Save to sessionStorage for current session
    sessionStorage.setItem('deliveryLocation', JSON.stringify(locationData));
    onSelectLocation(name, pincode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 h-screen" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md rounded-xl shadow-xl transform transition-transform duration-500 ease-out translate-y-0 overflow-hidden p-6 my-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Enter your Delivery Pincode
          </h2>
          <button
            aria-label="Close location modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="mb-6">
          <form onSubmit={handlePincodeSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={handlePincodeChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-500 text-sm"
              maxLength={6}
              inputMode="numeric"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded text-sm font-medium transition-colors"
              disabled={isLoading || isGettingLocation}
            >
              {isLoading ? 'Checking...' : 'Apply'}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          className={`flex items-center space-x-2 text-gray-700 hover:bg-gray-50 p-3 rounded w-full transition-colors mb-6 ${isGettingLocation ? 'opacity-70' : ''}`}
          onClick={getLocationFromBrowser}
          disabled={isGettingLocation}
          aria-label="Get current location"
        >
          <FaMapMarkerAlt className="text-gray-600" size={16} />
          <div className="text-left flex-1">
            <div className="text-sm">Get current location</div>
            <div className="text-xs text-gray-500">Using GPS</div>
          </div>
          {isGettingLocation && (
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </button>

        {serviceability?.available && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-700 mb-2">
              <FaCheck className="mr-2" />
              <span className="font-medium">Delivery available to {serviceability.city}</span>
            </div>
            <div className="text-sm text-green-600 mb-2">
              Estimated delivery: {serviceability.estimatedDays}
            </div>
            <div className="text-xs text-gray-600">
              Available couriers: {serviceability.couriers?.map(c => c.courier_name).join(', ')}
            </div>
            <button
              onClick={() => handleLocationSelect(serviceability.city, pincode)}
              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              Confirm Location
            </button>
          </div>
        )}

        {serviceability?.available === false && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-700">
            <div className="flex items-center mb-2">
              <FaTimes className="mr-2" />
              <span className="font-medium">Delivery not available to this pincode</span>
            </div>
            <div className="text-sm">
              Please try a different pincode or check back later.
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => handleLocationSelect(city.name, city.pincode)}
              className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded transition-colors border border-gray-200"
              aria-label={`Select ${city.name} as delivery location`}
            >
              <div className="h-8 w-8 mb-1 flex items-center justify-center text-blue-600">
                <FaTruck size={18} />
              </div>
              <div className="text-sm text-gray-900 font-medium">
                {city.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {city.pincode}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Allowing permission to location helps us curate options that can be delivered to your location.
        </p>
      </div>
    </div>
  );
};

export default LocationModal;