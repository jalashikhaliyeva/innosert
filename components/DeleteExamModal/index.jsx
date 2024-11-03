// DeleteExamModal.jsx

import React, { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import axios from "axios";

function DeleteExamModal({ item, onDelete, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel(); // Close the modal when clicking outside
    }
  };

  // console.log(item.id, "item delete");

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url =
        item.type === "exam"
          ? `https://innocert-admin.markup.az/api/exam/destroy/${item.id}`
          : `https://innocert-admin.markup.az/api/exam-folder/${item.id}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Call onDelete callback to update the parent component's state
      onDelete(item.id);
    } catch (error) {
      console.error("Error deleting item:", error);
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
          {item?.type === "exam" ? "İmtahanı sil" : "Qovluğu sil"}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mt-2">
          Bu {item?.type === "exam" ? "imtahanı" : "qovluğu"} silmək istədiyinizə
          əminsinizmi? <br /> Bu əməliyyat geri alına bilməz.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
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

export default DeleteExamModal;
