import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function ExamEditTitleNavigation({onSubmit}) {
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
        İmtahan MOSE
      </h2>

      <div className="flex flex-row gap-2">
        {/* Dropdown Menu */}
        {/* <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center font-gilroy justify-center gap-2 py-3 px-4 h-11 text-black leading-6 rounded-md whitespace-nowrap"
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
            <ul className="p-2 font-gilroy">
              <li
                className="py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer font-gilroy"
                onClick={() => handleOptionClick("Variantli sual")} // Pass the clicked option to handler
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
        </div> */}
        {/* <button className="flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed whitespace-nowrap">
          <FaRegTrashAlt className="text-white w-4 h-4" />
          Sualı sil
        </button> */}

        <button
          onClick={onSubmit} 
         
          className="flex items-center justify-center gap-2 py-3 px-4 h-11 text-white leading-6 rounded-md bg-green600 hover:bg-green600Hover active:bg-green600Pressed whitespace-nowrap"
        >
          <FaRegCircleCheck className="text-white w-5 h-5" />
          Yadda saxla
        </button>
      </div>
    </div>
  );
}

export default ExamEditTitleNavigation;
