import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

export default function LogoutModal({ show, onClose }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal if clicked outside
    }
  };

  if (!show) return null;

  // Function to handle logout and token removal
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    onClose(); // Optional since redirection happens
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[9999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <IoLogOutOutline
              style={{ fontSize: "32px", color: "red", fill: "red" }}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center" style={{ fontFamily: "Gilroy" }}>
        Çıxış et
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mt-2" style={{ fontFamily: "Gilroy" }}>
          Çıxış etmək istədiyinizə əminsinizmi? <br></br> Bu əməliyyat geri alına bilməz.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            Xeyr
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 ml-2 bg-errorButtonDefault text-white rounded-lg hover:bg-errorButtonHover active:bg-errorButtonPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            Bəli
          </button>
        </div>
      </div>
    </div>
  );
}
