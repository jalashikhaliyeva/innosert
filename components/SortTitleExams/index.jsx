// components/SortTitleExams.jsx

import React, { useState, useEffect, useRef } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { useTranslation } from "react-i18next";

function SortTitleExams({ category, onSortOptionClick }) {
  // Destructure the prop
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to format category name (e.g., capitalize first letter)
  const formatCategory = (cat) => {
    if (!cat) return "Kategoriya"; // Default text if category is undefined
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Handle sort option selection
  const handleOptionClick = (option) => {
    if (onSortOptionClick) {
      onSortOptionClick(option); // Call the passed handler
    }
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <div className="flex items-center justify-between py-5 relative">
      <h5 className="font-gilroy font-medium leading-normal text-3xl text-textSecondaryDefault">
        {formatCategory(category)}
      </h5>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 justify-center font-gilroy text-base font-normal leading-6 text-textSecondaryDefault focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <BiSortAlt2 className="text-xl text-textSecondaryDefault" />
          {t("actions.sort")}
        </button>
        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 font-gilroy mt-2 w-48 bg-white rounded-lg shadow-lg z-30 transition-all duration-300 ease-in-out transform ${
            isDropdownOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <ul>
            <li
              className="cursor-pointer block text-lg my-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue px-4 py-2"
              onClick={() => handleOptionClick("price_low_high")}
            >
              {t("sort.cheap_to_expensive")}
            </li>
            <li
              className="cursor-pointer block text-lg my-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue px-4 py-2"
              onClick={() => handleOptionClick("price_high_low")}
            >
              {t("sort.expensive_to_cheap")}
            </li>
            <li
              className="cursor-pointer block text-lg my-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue px-4 py-2"
              onClick={() => handleOptionClick("new_to_old")}
            >
              {t("sort.new_to_old")}
            </li>
            <li
              className="cursor-pointer block text-lg my-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue px-4 py-2"
              onClick={() => handleOptionClick("old_to_new")}
            >
              {t("sort.old_to_new")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SortTitleExams;
