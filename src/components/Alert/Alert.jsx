import PropTypes from "prop-types";
import { useState, useEffect } from "react";

Alert.propTypes = {
  initialHidden: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function Alert({ initialHidden, status, message, onClose }) {
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(initialHidden);

  useEffect(() => {
    if (initialHidden) {
      setIsSlidingOut(false);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [initialHidden]);

  const handleClose = () => {
    setIsSlidingOut(true);
    setTimeout(() => onClose(), 300);
  };

  const statusStyles = {
    success: { borderColor: "border-green-500", textColor: "text-green-200" },
    error: { borderColor: "border-red-500", textColor: "text-red-200" },
    default: { borderColor: "border-gray-500", textColor: "text-gray-200" },
  };

  const { borderColor, textColor } =
    statusStyles[status] || statusStyles.default;

  return (
    <div
      className={`fixed h-10 min-w-96 pe-4 ${borderColor} flex flex-row border border-s-4 items-center ${textColor} right-0 top-10 z-10 bg-[#343a40] shadow-black shadow-lg transition-transform duration-300 ${
        isVisible
          ? "translate-x-full"
          : isSlidingOut
          ? "translate-x-full"
          : "translate-x-0"
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