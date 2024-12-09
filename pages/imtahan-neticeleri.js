// ImtahanNeticeleri.jsx
import ExamEndFail from "@/components/FinishExam/ExamEndFail";
import ExamEndSuccess from "@/components/FinishExam/ExamEndSucces";
import ExamResultHeader from "@/components/FinishExam/ExamResultHeader";
import Spinner from "@/components/Spinner";
import { UserContext } from "@/shared/context/UserContext";
import React, { useContext } from "react";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there is no NextAuth session, redirect to the index page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, proceed with the page rendering
  return {
    props: {
      // You can pass any additional props here
    },
  };
}
function ImtahanNeticeleri() {
  const { percentage } = useContext(UserContext);
  console.log(percentage, "percentage");

  // If percentage is null, render ExamEndFail directly
  if (percentage === null) {
    return <ExamEndFail percentage={percentage} />;
  }

  return (
    <>
      <ExamResultHeader />
      {percentage.percentage > 30 ? (
        <ExamEndSuccess percentage={percentage} />
      ) : (
        <ExamEndFail percentage={percentage} />
      )}
    </>
  );
}

export default ImtahanNeticeleri;
