// DeleteExamModal.jsx
import React, { useContext, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import axios from "axios";
import PropTypes from "prop-types";
import CompanyContext from "@/shared/context/CompanyContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DeleteExamModal({ selectedItems, onDelete, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCompany } = useContext(CompanyContext);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel(); // Close the modal when clicking outside
    }
  };

  console.log(selectedItems, "selectedItems");

  // Separate selected items into exams and folders
  const exams = selectedItems
    .filter((item) => item.type === "exam")
    .map((item) => item.id);
  const folders = selectedItems
    .filter((item) => item.type === "folder")
    .map((item) => item.id);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = "https://innocert-admin.markup.az/api/exam/bulk-destroy";

      const payload = {
        exams: exams.length > 0 ? exams : [],
        folder: folders.length > 0 ? folders : [],
      };

      console.log(payload, "payload");

      const response = await axios.delete(url, {
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Company-ID": selectedCompany.id,
        },
      });

      // Optionally, you can check the response status or data here
      if (response.status === 200) {
        // Notify parent about deleted items
        onDelete(selectedItems.map((item) => item.id));
        toast.success("Seçili elementlər uğurla silindi."); // Optional success message
      } else {
        console.error("Unexpected response:", response);
        toast.error("Gözlənilməz bir xəta baş verdi."); // Optional error message
      }
    } catch (error) {
      console.error("Error deleting items:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          if (error.response.status === 400) {
            toast.error(
              "Bu imtahandan artıq keçmiş istifadəçilər olduğu üçün silmək mümkün deyil."
            );
          } else if (error.response.data && error.response.data.message) {
            // If your API provides a specific error message
            toast.error(error.response.data.message);
          } else {
            toast.error("Silinmə əməliyyatı uğursuz oldu.");
          }
        } else if (error.request) {
          // Request was made but no response received
          toast.error(
            "Server cavab vermir. Zəhmət olmasa sonra yenidən cəhd edin."
          );
        } else {
          // Something else happened
          toast.error("Silinmə zamanı xəta baş verdi.");
        }
      } else {
        // Non-Axios error
        toast.error("Bir xəta baş verdi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = selectedItems.length;

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
          {`Silinmək üzrə ${itemCount} element`}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mt-2">
          {`Bu əməliyyatı təsdiqləmək istədiyinizə əminsinizmi? Bu əməliyyat geri alına bilməz.`}
        </p>

        {/* Optional: List of items to delete */}
        {/* <div className="mt-4 max-h-40 overflow-y-auto">
          {exams.length > 0 && (
            <div>
              <strong>İmtahanlar:</strong>
              <ul className="list-disc list-inside">
                {selectedItems
                  .filter((item) => item.type === "exam")
                  .map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
              </ul>
            </div>
          )}
          {folders.length > 0 && (
            <div className="mt-2">
              <strong>Qovluqlar:</strong>
              <ul className="list-disc list-inside">
                {selectedItems
                  .filter((item) => item.type === "folder")
                  .map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
              </ul>
            </div>
          )}
        </div> */}

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

DeleteExamModal.propTypes = {
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["exam", "folder"]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteExamModal;
