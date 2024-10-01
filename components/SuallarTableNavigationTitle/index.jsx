import React from "react";
import { FaPlus } from "react-icons/fa";
function SuallarTableNavigationTitle() {
  return (
    <div className="flex flex-row justify-between pb-6">
      <h2
        data-aos="fade-right"
        className="font-gilroy text-2xl font-medium leading-8 "
      >
        Sual toplusu
      </h2>
      <button className="flex items-center justify-center gap-4 py-3 px-4 h-11  text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary">
        <FaPlus className="fill-white text-white" />
        Əlavə et
      </button>
    </div>
  );
}

export default SuallarTableNavigationTitle;
