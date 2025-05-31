import React from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
} from "react-icons/fa";

const SocialShare = ({ title = "Check out this product!", link = "" }) => {
  const encodedUrl = encodeURIComponent(link);
  const encodedTitle = encodeURIComponent(title);

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodedTitle}%20$Url={encodedUrl}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      "_blank"
    );
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: link,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  return (
    <div className="flex gap-3 mt-4 items-center">
      <span className="font-semibold text-gray-900 text-xl">Share:</span>
      <button onClick={shareOnWhatsApp} className="text-green-500 text-xl cursor-pointer">
        <FaWhatsapp size={24} />
      </button>
      <button onClick={shareOnFacebook} className="text-blue-600 text-xl cursor-pointer">
        <FaFacebookF size={24} />
      </button>
      <button onClick={shareOnTwitter} className="text-sky-400 text-xl cursor-pointer">
        <FaTwitter size={24}  />
      </button>
      <button onClick={shareOnLinkedIn} className="text-blue-700 text-xl cursor-pointer">
        <FaLinkedinIn size={24} />
      </button>
      <button onClick={nativeShare} className="text-gray-600 text-xl cursor-pointer">
        <FaShareAlt size={24} />
      </button>
    </div>
  );
};
export default SocialShare;