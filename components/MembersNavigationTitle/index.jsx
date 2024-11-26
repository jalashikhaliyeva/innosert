import React from "react";
import { LuUserPlus, LuSearch } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { useTranslation } from "react-i18next";
function MembersNavigationTitle({
  openModal,
  selectedRows,
  handleDeleteSelected,
  openDeleteModal,
  searchTerm,
  setSearchTerm,
}) {
  const { t } = useTranslation();
  return (
    <div className="flex md:flex-row flex-col justify-between relative font-gilroy">
      <h1 className="text-2xl font-medium leading-8">{t("members.title")}</h1>

      {/* Conditional rendering based on selectedRows */}
      {selectedRows?.length === 0 ? (
        <div className="flex gap-3 items-center">
          <div className="flex items-center hover:bg-gray-100 bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden w-full transition-colors duration-200">
            {/* Search Icon */}
            <LuSearch className="text-inputPlaceholderText size-4 sm:size-6 flex-shrink-0" />

            {/* Search Input */}
            <input
              type="text"
              placeholder={t("placeholders.search")}
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 w-full text-sm sm:text-base bg-transparent outline-none placeholder-inputPlaceholderText pl-2 cursor-text"
            />
          </div>

          <button
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
            onClick={openModal}
          >
            <LuUserPlus className="size-5 text-white" />
            {t("members.addMember")}
          </button>
        </div>
      ) : (
        // Display delete button when rows are selected
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed"
            onClick={() => openDeleteModal()}
          >
            <BsTrash className="size-5 text-white" />
            {t("members.deleteSelectedMembers")}
          </button>
        </div>
      )}
    </div>
  );
}

export default MembersNavigationTitle;
