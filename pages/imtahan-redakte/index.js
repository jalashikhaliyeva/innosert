import React, { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import ExamDetailsTabGroup from "@/components/ExamDetailsTabGroup";
import { UserContext } from "@/shared/context/UserContext";
import Container from "@/components/Container";
import ExamEditTitleNavigation from "@/components/ExamEditTitleNavigation";
import EditExamTabGroup from "@/components/EditExamTabGroup";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";

function ImtahanRedakte() {
  return (
    <>
     <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <TeacherDashboardHeader />
      </div>
      <Container>
        <Breadcrumb />
        <ExamEditTitleNavigation />
        <EditExamTabGroup />
      </Container>
    </>
  );
}

export default ImtahanRedakte;
