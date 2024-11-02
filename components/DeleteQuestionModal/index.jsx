import React from "react";
import { IoWarningOutline } from "react-icons/io5";

function DeleteModal({ onCancel, onDelete }) {
  // Handle background click to close the modal when clicked outside
  const handleBackgroundClick = (e) => {
    // Check if the click target is the modal background
    if (e.target === e.currentTarget) {
      onCancel(); // Close the modal
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 m-8 lg:m-0">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <IoWarningOutline
              style={{ fontSize: "32px", color: "red", fill: "red" }}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold text-gray-900 text-center"
          style={{ fontFamily: 'Gilroy' }}
        >
          Sualı Sil
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-600 text-center mt-2"
          style={{ fontFamily: 'Gilroy' }}
        >
          Bu sualı silmək istədiyinizə əminsinizmi? <br /> Bu əməliyyat geri alına bilməz.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: 'Gilroy' }}
          >
            Ləğv et
          </button>
          <button
            onClick={onDelete}
            className="w-full py-2 px-4 ml-2 bg-errorButtonDefault text-white rounded-lg hover:bg-errorButtonHover active:bg-errorButtonPressed focus:outline-none"
            style={{ fontFamily: 'Gilroy' }}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
