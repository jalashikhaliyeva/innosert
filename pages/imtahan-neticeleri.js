import ExamEndFail from "@/components/FinishExam/ExamEndFail";
import ExamEndSucces from "@/components/FinishExam/ExamEndSucces";
import ExamResultHeader from "@/components/FinishExam/ExamResultHeader";
import Spinner from "@/components/Spinner";
import { UserContext } from "@/shared/context/UserContext";
import React, { useContext } from "react";

// If response.data.data is a number
function ImtahanNeticeleri() {
  const { percentage } = useContext(UserContext);
  console.log(percentage, "percentage");

  if (percentage === null) {
    return <Spinner />;
  }

  return (
    <>
      <ExamResultHeader />
      {percentage > 30 ? (
        <ExamEndSucces percentage={percentage} />
      ) : (
        <ExamEndFail percentage={percentage} />
      )}
    </>
  );
}


export default ImtahanNeticeleri;
