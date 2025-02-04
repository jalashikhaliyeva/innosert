// IncreaseBalanceModal.jsx

import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const predefinedAmounts = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 400, 500,
];

function IncreaseBalanceModal({ closeModal }) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [inputError, setInputError] = useState("");
  const [focusedInput, setFocusedInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // To display API errors

  // Refs for buttons
  const buttonRefs = useRef({});

  // Handle changes in the input field
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and at most one decimal point with up to two decimal places
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      if (inputError && value) {
        setInputError("");
      }
    }
  };

  // Handle clicks on predefined amount buttons
  const handlePredefinedClick = (value) => {
    setAmount(value.toString());
    setInputError("");
    // Scroll the clicked button into view
    if (buttonRefs.current[value]) {
      buttonRefs.current[value].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);

    // Regular expression to validate up to two decimal places
    const decimalRegex = /^\d+(\.\d{1,2})?$/;

    // Validation checks with specific error messages
    if (!amount) {
      setInputError(t("errors.amountRequired"));
      return;
    }

    if (isNaN(numericAmount)) {
      setInputError(t("errors.invalidAmount"));
      return;
    }

    if (numericAmount < 0.1) {
      setInputError(t("errors.minimumAmount"));
      return;
    }

    if (numericAmount > 500) {
      setInputError(t("errors.maximumAmount"));
      return;
    }

    if (!decimalRegex.test(amount)) {
      setInputError(t("errors.invalidFormat"));
      return;
    }

    // If all validations pass, proceed
    setInputError("");
    setLoading(true);
    setApiError(""); // Reset API error

    // Prepare data to send
    const requestBody = { balance: amount };
    const token = localStorage.getItem("token");

    // Log the data being sent
    // console.log("Sending data to API:", requestBody);

    try {
      const response = await fetch(
        "https://api.innosert.az/api/me/add-balance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      // Log the response from the API
      // console.log("Received response from API:", responseData);

      if (
        responseData.status &&
        responseData.data &&
        responseData.data.data.url
      ) {
        // Navigate to the URL in a new tab
        window.open(responseData.data.data.url, "_blank");
        setAmount("");
        closeModal();
      } else {
        // Handle API response errors
        const errorMessage =
          responseData.message || t("errors.unexpectedError");
        console.error("API Error:", errorMessage);
        setApiError(errorMessage);
      }
    } catch (error) {
      console.error("Error increasing balance:", error);
      setApiError(t("errors.networkError"));
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="bg-boxGrayBodyColor z-50 p-10 flex flex-col gap-7 justify-center rounded-lg shadow-lg relative w-[90%] max-w-md">
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

        {/* Modal Title */}
        <h2 className="text-textSecondaryDefault text-2xl font-medium font-gilroy leading-8">
          {t("actions.increaseBalanc")}
        </h2>

        {/* Input Field */}
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocusedInput(true)}
            onBlur={() => setFocusedInput(false)}
            className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pr-16 py-3 px-4 border ${
              inputError
                ? "border-inputRingError"
                : focusedInput
                ? "border-inputRingFocus"
                : "border-inputBorder"
            } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
            placeholder={t("placeholders.enterAmount")}
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-textSecondaryDefault">
            AZN
          </span>
        </div>

        {/* Error Messages */}
        {inputError && (
          <div className="text-red-600 text-sm -mt-4">{inputError}</div>
        )}
        {apiError && (
          <div className="text-red-600 text-sm -mt-4">{apiError}</div>
        )}

        {/* Predefined Amounts - Horizontally Scrollable */}
        <div className="flex overflow-x-auto space-x-2 py-2">
          {predefinedAmounts.map((amt) => (
            <button
              key={amt}
              ref={(el) => (buttonRefs.current[amt] = el)}
              type="button"
              onClick={() => handlePredefinedClick(amt)}
              className="flex-shrink-0 py-2 px-4 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
            >
              {amt} AZN
            </button>
          ))}
        </div>

        {/* Optionally, customize the scrollbar (optional) */}
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .overflow-x-auto {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>

        {/* Submit Button */}
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
              {t("register.loading")}
            </div>
          ) : (
            t("confirm")
          )}
        </button>
      </div>
    </div>
  );
}

export default IncreaseBalanceModal;
