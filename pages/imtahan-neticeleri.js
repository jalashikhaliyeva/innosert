import ExamEndFail from "@/components/FinishExam/ExamEndFail";
import ExamEndSucces from "@/components/FinishExam/ExamEndSucces";
import ExamResultHeader from "@/components/FinishExam/ExamResultHeader";
import React from "react";

function ImtahanNeticeleri() {
  return (
    <>
      <ExamResultHeader />
      {/* <ExamEndSucces />  */}
      <ExamEndFail />
    </>
  );
}

export default ImtahanNeticeleri;
