import { useEffect } from "react";
import { AlertStatus } from "../../../index";

interface AlertProps {
  isShow: boolean;
  alertStatus: AlertStatus;
  message: string;
  onClose: () => void;
}

export default function Alert({
  isShow,
  alertStatus,
  message,
  onClose,
}: AlertProps) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, [isShow]);

  const statusStyles: Record<
    AlertStatus,
    { borderColor: string; textColor: string }
  > = {
    success: { borderColor: "border-green-500", textColor: "text-green-200" },
    error: { borderColor: "border-red-500", textColor: "text-red-200" },
    default: { borderColor: "border-gray-500", textColor: "text-gray-200" },
  };

  //console.log(alertStatus);

  const { borderColor, textColor } = statusStyles[alertStatus];

  return (
    <div
      className={`fixed h-10 min-w-96 pe-4 ${borderColor} flex flex-row border border-s-8 items-center ${textColor} right- top-10 z-10 bg-[#343a40] shadow-black shadow-lg transition-transform duration-300 ${
        isShow ? "right-[-5px] translate-x-full" : "right-5 translate-x-0"
      }`}
    >
      <span className="material-symbols-outlined p-2">
        {status === "success" ? "check" : status === "error" ? "error" : ""}
      </span>
      <div>
        <p>{message}</p>
      </div>
      <button className="flex ms-auto group" onClick={onClose}>
        <span className="material-symbols-outlined items-center group-hover:text-white">
          close
        </span>
      </button>
    </div>
  );
}
