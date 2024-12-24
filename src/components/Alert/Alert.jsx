import PropTypes from "prop-types";
import { useState, useEffect } from "react";

Alert.propTypes = {
  initialHidden: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired, // Add onClose prop
};

export default function Alert({ initialHidden, status, message, onClose }) {
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(!initialHidden);

  // Effect to handle visibility based on initialHidden prop
  useEffect(() => {
    if (initialHidden) {
      setIsSlidingOut(false); // Reset sliding out state if hidden
      setIsVisible(false); // Hide the alert
    } else {
      setIsVisible(true); // Show the alert
    }
  }, [initialHidden]);

  let borderColor;
  let textColor;

  switch (status) {
    case "success":
      borderColor = "border-green-500";
      textColor = "text-green-200";
      break;
    case "error":
      borderColor = "border-red-500";
      textColor = "text-red-200";
      break;
    default:
      borderColor = "border-gray-500";
      break;
  }

  const handleClose = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      onClose(); // Call the onClose function passed from the parent
    }, 300); // Wait for the transition to finish
  };

  return (
    <div
      className={`fixed h-10 min-w-96 pe-4 ${borderColor} flex flex-row border border-s-4 items-center ${textColor} right-0 top-10 z-10 bg-[#343a40] shadow-black shadow-lg transition-transform duration-300 ${
        initialHidden
          ? "translate-x-full" // Slide out if initialHidden is true
          : isSlidingOut
          ? "translate-x-full" // Slide out if isSlidingOut is true
          : "translate-x-0" // Slide in otherwise
      }`}
    >
      <span className="material-symbols-outlined p-2">
        {status === "success" ? "check" : "error"}
      </span>

      <div>
        <p>{message}</p>
      </div>
      <button className="flex ms-auto group" onClick={handleClose}>
        <span className="material-symbols-outlined items-center group-hover:text-white">
          close
        </span>
      </button>
    </div>
  );
}
