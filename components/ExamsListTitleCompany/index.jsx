import React, { useState, useEffect, useRef } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { BsTrash3, BsFilter } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";

function ExamsListTitleCompany({
  sortOption,
  setSortOption,
  selectedFiles,
  openDeleteModal,
}) {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const sortMenuRef = useRef(null);
  const filterMenuRef = useRef(null);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setIsSortMenuOpen(false);
  };

  const handleFilterOptionClick = (option) => {
    setFilterOption(option);
    setIsFilterMenuOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
      setIsSortMenuOpen(false);
    }
    if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
      setIsFilterMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between relative font-gilroy px-2">
      <h1 className="text-2xl font-medium leading-8">Suallar toplusu</h1>

      {selectedFiles.length > 0 ? (
        <div className="flex flex-row gap-4">
          <button
            onClick={openDeleteModal}
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed"
          >
            <BsTrash3 className="fill-white text-white" />
            Sil
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <div className="flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden z-10 hover:bg-inputBgHover">
            <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
            <input
              type="text"
              placeholder="Axtar"
              className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText hover:bg-inputBgHover"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-2 relative">
            <div
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center cursor-pointer gap-2"
            >
              <BsFilter />
              <p className="text-base text-textSecondaryDefault leading-6">
                Filter
              </p>
            </div>
            {isFilterMenuOpen && (
              <div
                ref={filterMenuRef}
                className="py-4 px-5 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-10"
              >
                <ul className="divide-y divide-gray-200 ">
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleFilterOptionClick("All")}
                  >
                    All
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleFilterOptionClick("Option 1")}
                  >
                    Option 1
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleFilterOptionClick("Option 2")}
                  >
                    Option 2
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center justify-center gap-2 relative">
            <div
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="flex items-center cursor-pointer gap-2"
            >
              <TbArrowsSort />
              <p className="text-base text-textSecondaryDefault leading-6">
                Sırala
              </p>
            </div>
            {isSortMenuOpen && (
              <div
                ref={sortMenuRef}
                className="py-4 px-5 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-10"
              >
                <ul className="divide-y divide-gray-200 ">
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("Son Yaradilan")}
                  >
                    Son Yaradilan
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("Ilk Yaradilan")}
                  >
                    Ilk Yaradilan
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("A-Z")}
                  >
                    A-Z
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                    onClick={() => handleSortOptionClick("Z-A")}
                  >
                    Z-A
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamsListTitleCompany;
