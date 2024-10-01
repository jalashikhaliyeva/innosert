import React, { useState, useEffect, useRef } from "react";
import { BiSortAlt2 } from "react-icons/bi";

function SortTitleExams({ category }) { // Accept the category prop
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
          Sırala
        </button>
        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl z-30 transform transition ease-out duration-200 ${
            isDropdownOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-1 pointer-events-none"
          }`}
          style={{ padding: "14px 20px", textAlign: "center" }}
        >
          <ul className="divide-y divide-gray-200">
            <li className="py-3 text-textSecondaryDefault text-lg font-gilroy leading-6 font-normal hover:bg-gray-50 hover:text-textHoverBlue cursor-pointer">
              Ucuzdan bahaya
            </li>
            <li className="py-3 text-textSecondaryDefault text-lg font-gilroy leading-6 font-normal hover:bg-gray-50 hover:text-textHoverBlue cursor-pointer">
              Bahadan ucuza
            </li>
            <li className="py-3 text-textSecondaryDefault text-lg font-gilroy leading-6 font-normal hover:bg-gray-50 hover:text-textHoverBlue cursor-pointer">
              Yenidən köhnəyə
            </li>
            <li className="py-3 text-textSecondaryDefault text-lg font-gilroy leading-6 font-normal hover:bg-gray-50 hover:text-textHoverBlue cursor-pointer">
              Köhnədən yeniyə
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SortTitleExams;
