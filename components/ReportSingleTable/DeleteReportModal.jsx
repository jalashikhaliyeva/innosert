import React from "react";
import { IoWarningOutline } from "react-icons/io5";

function DeleteReportModal({ onCancel, onDelete, actionType }) {
  const handleBackgroundClick = (e) => {
    // Close the modal if the user clicks outside of it
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  // Define the confirmation message based on the action type
  const confirmationMessage =
    actionType === "Düzəliş edildi"
      ? "Düzəliş edilməyinə əminsinizmi?"
      : "Xəta olmadığına əminsinizmi?";

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
            <IoWarningOutline
              style={{ fontSize: "32px", color: "orange", fill: "orange" }}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold text-gray-900 text-center"
          style={{ fontFamily: "Gilroy" }}
        >
          {actionType === "Düzəliş edildi"
            ? "Düzəliş edildi təsdiqi"
            : "Xəta deyil təsdiqi"}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-600 text-center mt-2"
          style={{ fontFamily: "Gilroy" }}
        >
          {confirmationMessage} Bu əməliyyat geri alına bilməz.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            Ləğv et
          </button>
          <button
            onClick={onDelete}
            className="w-full py-2 px-4 ml-2 bg-orange-300 text-textSecondaryDefault rounded-lg hover:bg-orange-200 active:bg-errorButtonPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            Təsdiq et
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReportModal;
