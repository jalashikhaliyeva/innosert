import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function ExamCreateTitleNavigation({ isFormValid, onSubmit, isSubmitting }) {
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
    <div className="flex flex-row justify-between pb-6">
      <h2 className="font-gilroy text-2xl font-medium leading-8 ">
        İmtahan Yarat
      </h2>

      <div className="flex flex-row gap-2">
        <button className="flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed whitespace-nowrap">
          <FaRegTrashAlt className="text-white w-4 h-4" />
          İmtina
        </button>

        <button
          onClick={onSubmit} // Attach onSubmit handler
          disabled={!isFormValid || isSubmitting}
          className={`flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md ${
            isFormValid && !isSubmitting
              ? "bg-green600 hover:bg-green600Hover active:bg-green600Pressed"
              : "bg-gray-400 cursor-not-allowed"
          } whitespace-nowrap`}
        >
          <FaRegCircleCheck className="text-white w-5 h-5" />
          {isSubmitting ? "Paylaşılır..." : "Paylaş"}
        </button>
      </div>
    </div>
  );
}

export default ExamCreateTitleNavigation;
