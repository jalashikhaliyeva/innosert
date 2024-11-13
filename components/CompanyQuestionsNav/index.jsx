// CompanyQuestionsNav.jsx
import React, { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { BsGrid } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import { useTranslation } from "react-i18next";
function CompanyQuestionsNav({
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  selectedFiles,
  openModal,
  onDelete,
  openDeleteFolderModal,
  openBulkDeleteModal, // Receive the bulk delete function
}) {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const { t } = useTranslation();
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setIsSortMenuOpen(false);
  };

  return (
    <div className="flex justify-between relative font-gilroy">
      <h1 className="text-2xl font-medium leading-8">Sual Toplusu</h1>

      {selectedFiles.length > 0 ? (
        // Show the delete section when folders are selected
        <div className="flex flex-row gap-4">
          <button
            onClick={openBulkDeleteModal} // Trigger bulk delete modal
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed"
          >
            <BsTrash3 className="fill-white text-white" />
            {t("actions.delete")}
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
                  {t("actions.sort")}
                </p>
              </div>
              {isSortMenuOpen && (
                <div className="py-4 px-5 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-10">
                  <ul className="divide-y divide-gray-200">
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Son Yaradilan")}
                    >
                      {t("actions.newest")}
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Ilk Yaradilan")}
                    >
                      {t("actions.oldest")}
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
            <div className="p-1 flex flex-row gap-3 border border-inputBorder rounded-lg">
              {/* Grid Icon */}
              <div
                className={`p-1 rounded-lg cursor-pointer ${
                  viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <BsGrid className="size-6" />
              </div>
              {/* List Icon */}
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

          {/* Add Button */}
          <div>
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
            >
              <FaPlus className="fill-white text-white" />
              {t("actions.add")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyQuestionsNav;
