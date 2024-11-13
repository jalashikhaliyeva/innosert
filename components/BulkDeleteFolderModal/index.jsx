// BulkDeleteFolderModal.jsx
import React, { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import axios from "axios";

function BulkDeleteFolderModal({ folders, closeModal, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Optional: For error handling

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null); // Reset any previous errors
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const payload = { folder: folders.map((folder) => folder.id) };

      // Log payload to console to inspect data being sent
      console.log("Data being sent to API:", payload);
  

      // Corrected API endpoint and payload structure
      const response = await axios.post(
        "https://innocert-admin.markup.az/api/folder-bulk-delete",
        { folder: folders.map((folder) => folder.id) }, // Correct key: 'folder'
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure JSON content type
          },
        }
      );

      // Optionally, check the response status or data
      if (response.status === 200 || response.status === 204) {
        // Call onDelete callback to update the parent component's state
        onDelete(folders.map((folder) => folder.id));
        closeModal();
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error deleting folders:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while deleting folders."
      );
      // Optionally, you can display this error to the user
    } finally {
      setIsLoading(false);
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
            <IoWarningOutline style={{ fontSize: "32px", color: "red" }} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Qovluqları Sil
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mt-2">
          Seçilmiş qovluqları silmək istədiyinizə əminsinizmi? <br /> Bu
          əməliyyat geri alına bilməz.
        </p>

        {/* Optional: Display Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={closeModal}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover"
          >
            Ləğv et
          </button>
          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 ml-2 bg-errorButtonDefault text-white rounded-lg hover:bg-errorButtonHover"
            disabled={isLoading}
          >
            {isLoading ? "Silinir..." : "Sil"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BulkDeleteFolderModal;
