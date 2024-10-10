import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiBuildingLine } from "react-icons/ri";

// Accept selectedOption and setSelectedOption as props
function QuestionEditNavigationTitle({ selectedOption, setSelectedOption }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-between relative font-gilroy">
      <h1 data-aos="fade-right" className="text-2xl font-medium leading-8">
        Sual
      </h1>

      <div className="flex gap-2">
        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center font-gilroy justify-center gap-2 py-3 px-4 h-11 text-black leading-6 rounded-md  whitespace-nowrap"
          >
            {selectedOption}
            {isDropdownOpen ? (
              <FiChevronUp className="ml-2 text-black" />
            ) : (
              <FiChevronDown className="ml-2 text-black" />
            )}
          </button>
          <div
            className={`absolute right-0 top-full w-52 text-lg bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
              isDropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <ul className="p-2 font-gilroy ">
              <li
                className="py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer font-gilroy"
                onClick={() => handleOptionClick("Variantli sual")}
              >
                <div className="rounded-lg px-4">Variantli sual</div>
              </li>
              <li
                className="py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer font-gilroy"
                onClick={() => handleOptionClick("Açıq sual")}
              >
                <div className="rounded-lg px-4">Açıq sual</div>
              </li>
              <li
                className="py-2 hover:bg-gray-100 cursor-pointer font-gilroy"
                onClick={() => handleOptionClick("Kombinasiya sualı")}
              >
                <div className="rounded-lg px-4">Kombinasiya sualı</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Delete Button */}
        <button className="flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed whitespace-nowrap">
          <FaRegTrashAlt className="text-white w-4 h-4" />
          Sualı sil
        </button>

        {/* Save Button */}
        <button className="flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md bg-green600 hover:bg-green600Hover active:bg-green600Pressed whitespace-nowrap">
          <FaRegCircleCheck className="text-white w-5 h-5" />
          Yadda saxla
        </button>
      </div>
    </div>
  );
}

export default QuestionEditNavigationTitle;
