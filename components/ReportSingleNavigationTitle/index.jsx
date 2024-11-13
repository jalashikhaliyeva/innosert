import React from "react";
import { LuSearch } from "react-icons/lu";
import { useTranslation } from 'react-i18next';
function ReportSingleNavigationTitle({ reportData, setSearchTerm }) {
  const { t } = useTranslation();
  const question =
    reportData && reportData.length > 0 ? reportData[0].question : "";

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center relative font-gilroy mb-5">
     <h1
        className="text-2xl font-medium leading-8 mb-4 md:mb-0"
        dangerouslySetInnerHTML={{
          __html: `${question} ${t('messages.errorsInQuestion')}`,
        }}
      ></h1>

      <div className="lg:w-[20%] w-full flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden">
        <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
        <input
          type="text"
          placeholder={t('placeholders.search')}
          onChange={handleSearchChange} // Update search term
          className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2"
        />
      </div>
    </div>
  );
}

export default ReportSingleNavigationTitle;
