import { addMemberToCompany } from "@/services/addMemberToCompany";
import React, { useContext, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import CompanyContext from "@/shared/context/CompanyContext";

import { toast, ToastContainer } from "react-toastify";

function AddMemberModal({ closeModal }) {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedCompany } = useContext(CompanyContext);
  console.log(selectedCompany.id, "selectedCompany add member modal");
  
  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      setInputError(true);
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await addMemberToCompany(email, token,selectedCompany.id);
      console.log("User added successfully:", response);

      toast.success("İstifadəçi uğurla əlavə olundu!");  // Show success toast
      setLoading(false);
      closeModal();
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.warning("İstifadəçini əlavə etmək alınmadı, yenidən cəhd edin!");  // Show error toast
      setLoading(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email || !isValidEmail(email)) {
  //     setInputError(true); // Trigger error if input is invalid
  //     return;
  //   }
  //   setLoading(true); // Set loading to true on submit

  //   if (!email || !isValidEmail(email)) {
  //     setInputError(true); // Trigger error if input is invalid
  //     return;
  //   }
  //   setLoading(true); // Set loading to true on submit

  //   try {
  //     // Call the addUser service to send email
  //     const response = await addMemberToCompany(email);
  //     console.log("User added successfully:", response);

  //     setLoading(false);
  //     closeModal(); // Close modal after success
  //   } catch (error) {
  //     console.error("Failed to add user:", error);
  //     setLoading(false); // Stop loading on error
  //     // Optionally, handle specific error UI (e.g., display an error message)
  //   }
  // };

  // Handle input change and reset error state when typing
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (inputError && e.target.value && isValidEmail(e.target.value)) {
      setInputError(false);
    }
  };

  // Handle key press (Enter) to submit the form
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
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
      <div className="bg-boxGrayBodyColor z-50 p-10 flex flex-col gap-7 justify-center rounded-lg shadow-lg relative min-w-[400px]">
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
          Üzvün Emaili
        </h2>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
          className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pr-3 py-3 px-4 border ${
            inputError && (!email || !isValidEmail(email))
              ? "border-inputRingError"
              : focusedInput === "email"
              ? "border-inputRingFocus"
              : "border-inputBorder"
          } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
          placeholder="Email daxil edin..."
        />

        {/* Helper Text */}
        {inputError && (!email || !isValidEmail(email)) && (
          <div className="text-red-600 text-sm -mt-4">
            Zəhmət olmasa, etibarlı email ünvanı daxil edin.
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
          disabled={loading} // Disable the button when loading is true
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
        {/* Toast container to show toast messages */}
        <ToastContainer />
    </div>
  );
}

export default AddMemberModal;
