import React, { useContext, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MemberActivityQuestionOrExam from "@/components/MemberActivityQuestionOrExam";
import MemberActivityName from "@/components/MemberActivityName";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext";

function UzvAktivliyi() {
  const { memberActivitySingle } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // You can use the `id` here for fetching data or any other logic
      console.log("ID from query:", id);
    }
  }, [id]);

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
            <MemberActivityName memberActivitySingle={memberActivitySingle} />
            <MemberActivityQuestionOrExam id={id} />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default UzvAktivliyi;
