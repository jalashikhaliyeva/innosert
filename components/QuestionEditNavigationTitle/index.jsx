"use client"; // Add this line if you're using Next.js 13+ with the App Router

import React, { useState } from "react";
import { FaRegTrashAlt, FaRegCheckCircle } from "react-icons/fa"; // Removed FaPen as it wasn't used
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from 'next/router'; // Import useRouter from Next.js

function QuestionEditNavigationTitle({
  selectedOption,
  setSelectedOption,
  onSave,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Determine if the current page is "sual-redakte"
  const isSualRedakte = router.pathname === '/sual-redakte';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full font-gilroy p-4">
      {/* Left side: "Sual" */}
      <div>
        <h1 className="text-2xl font-medium leading-8">Sual</h1>
      </div>

      {/* Right side: Dropdown and Buttons */}
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        {/* Conditionally render Dropdown Menu */}
        {!isSualRedakte && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center gap-2 py-2 px-4 h-10 text-black leading-6 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 whitespace-nowrap"
            >
              {selectedOption}
              {isDropdownOpen ? (
                <FiChevronUp className="ml-2 text-black" />
              ) : (
                <FiChevronDown className="ml-2 text-black" />
              )}
            </button>
            <div
              className={`absolute right-0 mt-2 w-56 text-lg bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                isDropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <ul className="p-2 font-gilroy">
                <li
                  className="py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick("Variantli sual")}
                >
                  <div className="px-4">Variantli sual</div>
                </li>
                <li
                  className="py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick("Açıq sual")}
                >
                  <div className="px-4">Açıq sual</div>
                </li>
                <li
                  className="py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick("Kombinasiya sualı")}
                >
                  <div className="px-4">Kombinasiya sualı</div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Delete Button */}
        <button className="flex items-center gap-2 py-2 px-4 h-10 text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed whitespace-nowrap">
          <FaRegTrashAlt className="text-white w-4 h-4" />
          Sualı sil
        </button>

        {/* Save Button */}
        <button
          onClick={onSave}
          className="flex items-center gap-2 py-2 px-4 h-10 text-white leading-6 rounded-md bg-green600 hover:bg-green600Hover active:bg-green600Pressed whitespace-nowrap"
        >
          <FaRegCheckCircle className="text-white w-5 h-5" /> {/* Updated Icon */}
          Yadda saxla
        </button>
      </div>
    </div>
  );
}

export default QuestionEditNavigationTitle;
