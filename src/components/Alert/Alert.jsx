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

  // Effect to handle visibility based on initialHidden prop
  useEffect(() => {
    if (initialHidden) {
      setIsSlidingOut(false); // Reset sliding out state if hidden
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
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div
      className={`fixed h-10 min-w-96 pe-4 ${borderColor} flex flex-row border border-s-4 items-center ${textColor} right-0 top-10 z-10 bg-[#343a40] shadow-black shadow-lg transition-transform duration-300 ${
        initialHidden
          ? "hidden" // Hide if initialHidden is true
          : isSlidingOut
          ? "translate-x-full" // Slide out to the right
          : "translate-x-0" // Stay in place
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
