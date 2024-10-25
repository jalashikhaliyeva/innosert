import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportTable from "@/components/ReportTable";
import ReportTitleNavigation from "@/components/ReportTitleNavigation";
import ReportSingleNavigationTitle from "@/components/ReportSingleNavigationTitle";
import ReportSingleTable from "@/components/ReportSingleTable";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";

function ReportsSingle() {
  // Initialize state for selected rows

  return (
    <>
     <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
      <div className="hidden lg:block md:w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
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
