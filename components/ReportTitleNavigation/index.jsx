import React from "react";
import { LuUserPlus, LuSearch } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";

function ReportNavigationTitle() {
  return (
    <div className="flex justify-between  items-center relative font-gilroy mb-5">
      <h1  className="text-2xl font-medium leading-8">
        Bildirilən Xətalar
      </h1>

      {/* Conditional rendering based on selectedRows */}

      <div className="w-[20%] flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden ">
        <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
        <input
          type="text"
          placeholder="Axtar"
          className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2"
        />
      </div>
    </div>
  );
}

export default ReportNavigationTitle;
