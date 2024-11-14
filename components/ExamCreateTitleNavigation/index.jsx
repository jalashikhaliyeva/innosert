import React, { useState, useEffect, useRef } from "react";
import {
  FaRegCheckCircle,
  FaRegTrashAlt,
  FaExclamationCircle,
} from "react-icons/fa"; // Added FaExclamationCircle
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function ExamCreateTitleNavigation({
  isFormValid,
  onSubmit,
  isSubmitting,
  hasEnoughQuestions, // New prop
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Variantli sual"); // Default option
  const dropdownRef = useRef(null); // Ref to the dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update selected option
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between pb-6">
        <h2 className="font-gilroy text-2xl font-medium leading-8 ">
          İmtahan Yarat
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <button className="flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed whitespace-nowrap">
            <FaRegTrashAlt className="text-white w-4 h-4" />
            İmtina
          </button>

          {/* Tooltip Wrapper */}
          <div className="relative group">
            <button
              onClick={onSubmit} // Attach onSubmit handler
              disabled={!isFormValid || isSubmitting || !hasEnoughQuestions}
              className={`flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md ${
                isFormValid && !isSubmitting && hasEnoughQuestions
                  ? "bg-green600 hover:bg-green600Hover active:bg-green600Pressed"
                  : "bg-gray-400 cursor-not-allowed"
              } whitespace-nowrap`}
            >
              <FaRegCheckCircle className="text-white w-5 h-5" />{" "}
              {/* Updated Icon */}
              {isSubmitting ? "Paylaşılır..." : "Paylaş"}
            </button>

            {/* Tooltip */}
            {!hasEnoughQuestions && (
              <div className="absolute bottom-full mb-2  -ml-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg font-gilroy ">
                  <FaExclamationCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                  <p className="ml-2 text-sm text-red-600">
                    Ən azı <strong>10 sual</strong> seçməlisiniz.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Remove the previous informational message */}
      {/* <div className="mb-4">
        {!hasEnoughQuestions && (
          <div
            className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm animate-fadeIn"
            role="alert"
            aria-live="assertive"
          >
            <FaExclamationCircle className="text-red-500 w-6 h-6 flex-shrink-0 mt-1" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-700">
                Qeyd:
              </p>
              <p className="mt-1 text-sm text-red-600">
                Ən azı <strong>10 sual</strong> seçməlisiniz.
              </p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default ExamCreateTitleNavigation;
