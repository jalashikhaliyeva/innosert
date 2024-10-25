import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MemberActivityQuestionOrExam from "@/components/MemberActivityQuestionOrExam";
import MemberActivityName from "@/components/MemberActivityName";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";

function UzvAktivliyi() {
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
            <MemberActivityName />
            <MemberActivityQuestionOrExam />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default UzvAktivliyi;
