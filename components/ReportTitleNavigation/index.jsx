import React from "react";
import { LuUserPlus, LuSearch } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { useTranslation } from "react-i18next";
function ReportNavigationTitle({ setSearchTerm }) {
  const { t } = useTranslation();
  // Accept setSearchTerm as a prop
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-center relative font-gilroy mb-5">
      <h1 className="text-2xl font-medium leading-8 mb-5 lg:mb-0">
        {t("titles.reportedErrors")}
      </h1>

      <div className="lg:w-[20%] w-full flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden">
        <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
        <input
          type="text"
          placeholder={t("placeholders.search")}
          onChange={handleSearchChange} // Call handleSearchChange on input change
          className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2"
        />
      </div>
    </div>
  );
}

export default ReportNavigationTitle;
