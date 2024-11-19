// AddFolderModal.jsx

import React, { useState } from "react";
import axios from "axios";

function AddFolderModal({ closeModal, addNewFolder, fetchFiles }) {
  const [folderName, setFolderName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);

  // AddFolderModal.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName) {
      setInputError(true);
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://innocert-admin.markup.az/api/folder/create/",
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "response add folder modal");

      // Instead of adding the folder directly, re-fetch the files
      await fetchFiles();
      closeModal();
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      <div className="bg-boxGrayBodyColor z-50 p-10 flex flex-col gap-7 justify-center rounded-lg shadow-lg relative min-w-[400px]">
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
          Faylın adı
        </h2>
        <input
          type="text"
          value={folderName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocusedInput("folderName")}
          onBlur={() => setFocusedInput(null)}
          className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pr-3 py-3 px-4 border ${
            inputError && !folderName
              ? "border-inputRingError"
              : focusedInput === "folderName"
              ? "border-inputRingFocus"
              : "border-inputBorder"
          } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
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
              : "bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Gözləyin...
            </div>
          ) : (
            "Yarat"
          )}
        </button>
      </div>
    </div>
  );
}

export default AddFolderModal;
