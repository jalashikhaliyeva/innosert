import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function SuallarTableNavigationTitle({ selectedRows, handleDelete,handleEdit }) {
  return (
    <div className="flex flex-row justify-between pb-6">
      <h2
       
        className="font-gilroy text-2xl font-medium leading-8 "
      >
        Sual toplusu
      </h2>

      {selectedRows.length > 0 ? (
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-4 py-3 px-4 h-11 text-white leading-6 rounded-md bg-errorButtonDefault hover:bg-errorButtonHover active:bg-errorButtonPressed"
        >
          <FaTrash className="fill-white text-white" />
          Sil
        </button>
      ) : (
        <button   onClick={handleEdit} className="flex items-center justify-center gap-4 py-3 px-4 h-11  text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary">
          <FaPlus className="fill-white text-white" />
          Əlavə et
        </button>
      )}
    </div>
  );
}

export default SuallarTableNavigationTitle;





