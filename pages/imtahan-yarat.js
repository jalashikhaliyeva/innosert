import React, { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import ExamDetailsTabGroup from "@/components/ExamDetailsTabGroup";
import { UserContext } from "@/shared/context/UserContext";
import Container from "@/components/Container";
import ExamEditTitleNavigation from "@/components/ExamEditTitleNavigation";
import EditExamTabGroup from "@/components/EditExamTabGroup";
import ExamCreateTitleNavigation from "@/components/ExamCreateTitleNavigation";
import CreateExamTabGroup from "@/components/CreateExamTabGroup";

function ImtahanYarat() {
  return (
    <>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <ExamCreateTitleNavigation />
        <CreateExamTabGroup />
      </Container>
    </>
  );
}

export default ImtahanYarat;
