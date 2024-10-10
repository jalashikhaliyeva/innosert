import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportTable from "@/components/ReportTable";
import ReportTitleNavigation from "@/components/ReportTitleNavigation";
import ReportSingleNavigationTitle from "@/components/ReportSingleNavigationTitle";
import ReportSingleTable from "@/components/ReportSingleTable";

function ReportsSingle() {
  // Initialize state for selected rows

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
            <ReportSingleNavigationTitle />
            <ReportSingleTable />
    
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default ReportsSingle;
