
import React from "react";
import { LuUserPlus, LuSearch } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";

function MembersNavigationTitle({ openModal, selectedRows, handleDeleteSelected,openDeleteModal,  }) {
  return (
    <div className="flex justify-between relative font-gilroy">
      <h1 data-aos="fade-right" className="text-2xl font-medium leading-8">
        Üzvlər
      </h1>

      {/* Conditional rendering based on selectedRows */}
      {selectedRows?.length === 0 ? (
        <div className="flex gap-3 items-center">
          <div className="flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden w-full">
            <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
            <input
              type="text"
              placeholder="Axtar"
              className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2"
            />
          </div>
          <button
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
            onClick={openModal}
          >
            <LuUserPlus className="size-5 text-white" />
            Üzv əlavə et
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
            Seçilmiş üzvləri sil
          </button>
        </div>
      )}
    </div>
  );
}

export default MembersNavigationTitle;
