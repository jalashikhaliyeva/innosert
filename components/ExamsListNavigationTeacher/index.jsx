import React, { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { BsGrid } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";

function ExamsListNavigationTeacher({
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  selectedExams,
  openAddExamModal,
  openDeleteModal,
}) {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setIsSortMenuOpen(false);
  };

  return (
    <div className="flex justify-between relative font-gilroy">
      <h1 className="text-2xl font-medium leading-8">İmtahanlar Siyahısı</h1>

      {selectedExams.length > 0 ? (
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
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-4">
          {/* Grouped Sorting Dropdown and View Mode Toggle */}
          <div className="flex items-center gap-4">
            {/* Sorting Dropdown */}
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
                <div className="py-4 px-5 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-10">
                  <ul className="divide-y divide-gray-200">
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Son Yaradilan")}
                    >
                      Son Yaradılan
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Ilk Yaradilan")}
                    >
                      İlk Yaradılan
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

            {/* View Mode Toggle */}
            <div className="p-1 flex gap-3 border border-inputBorder rounded-lg">
              <div
                className={`p-1 rounded-lg cursor-pointer ${
                  viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <BsGrid className="size-6" />
              </div>
              <div
                className={`p-1 rounded-lg cursor-pointer ${
                  viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => setViewMode("list")}
              >
                <VscListSelection className="size-6" />
              </div>
            </div>
          </div>

          {/* Add Exam Button */}
          <div>
            <button
              onClick={openAddExamModal}
              className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
            >
              <FaPlus className="fill-white text-white" />
              Əlavə et
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamsListNavigationTeacher;
