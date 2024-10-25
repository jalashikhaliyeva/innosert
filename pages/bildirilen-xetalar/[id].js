import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportTable from "@/components/ReportTable";
import ReportTitleNavigation from "@/components/ReportTitleNavigation";
import ReportSingleNavigationTitle from "@/components/ReportSingleNavigationTitle";
import ReportSingleTable from "@/components/ReportSingleTable";
import TeacherSidebar from "@/components/TeacherSidebar";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";

function ReportsSingle() {
  // Initialize state for selected rows

  return (
    <>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <TeacherDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          <TeacherSidebar />
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
