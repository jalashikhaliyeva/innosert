// for company

import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import ExamsListCompany from "@/components/ExamsListCompany";
import ExamsListTitleCompany from "@/components/ExamsListTitleCompany";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import React, { useState } from "react";

function UmumiImtahanlar() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Track selected files

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <ExamsListTitleCompany
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isCheckboxSelected={isCheckboxSelected}
              selectedFiles={selectedFiles}
              openModal={openModal} // Pass openModal function
              openDeleteModal={openDeleteModal} // Modal for deleting
            />
            <ExamsListCompany />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default UmumiImtahanlar;
