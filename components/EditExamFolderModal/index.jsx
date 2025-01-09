import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CompanyContext from "@/shared/context/CompanyContext";
import { useTranslation } from "react-i18next";

function EditExamFolderModal({ folder, item, closeModal, onFolderUpdate }) {
  const { t } = useTranslation(); 
  const { selectedCompany } = useContext(CompanyContext);
  const [folderName, setFolderName] = useState(folder?.name || "");
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (folder?.name) {
      setFolderName(folder.name);
    }
  }, [folder]);

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
    if (inputError && e.target.value) {
      setInputError(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!folderName) {
      setInputError(true);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url = `https://innocert-admin.markup.az/api/exam-folder/${folder.slug}`;
      // console.log("API URL:", url);
      // console.log("Payload:", { name: folderName });

      const response = await axios.post(
        url,
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Company-ID": selectedCompany.id,
          },
        }
      );

      if (response.status === 200) {
        toast.success(t('toastMessages.folderUpdated'));
        if (onFolderUpdate) {
          onFolderUpdate({ ...folder, name: folderName });
        }
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to update folder name.");
      if (error.response) {
        console.error("Error details:", error.response.data); // Detailed error info
      } else {
        console.error("Error updating folder:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="bg-boxGrayBodyColor z-50 p-10 flex flex-col gap-7 justify-center rounded-lg shadow-lg relative min-w-[300px] m-5 md:m-0 md:min-w-[400px]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-textSecondaryDefault text-2xl font-medium font-gilroy leading-8">
          Faylın adını dəyiş
        </h2>

        <input
          type="text"
          value={folderName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pr-3 py-3 px-4 border ${
            inputError ? "border-inputRingError" : "border-inputBorder"
          } bg-inputBgDefault rounded-md shadow-sm focus:outline-none`}
          placeholder="Ad daxil edin..."
        />

        {inputError && !folderName && (
          <div className="text-red-600 text-sm -mt-4">
            Faylın adı mövcud olmalıdır.
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className={`w-full flex font-gilroy justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
            loading
              ? "bg-[#DFDFDF] cursor-not-allowed"
              : "bg-buttonPrimaryDefault"
          }`}
          disabled={loading}
        >
          {loading ? "Gözləyin..." : "Dəyiş"}
        </button>
      </div>
    </div>
  );
}

export default EditExamFolderModal;
