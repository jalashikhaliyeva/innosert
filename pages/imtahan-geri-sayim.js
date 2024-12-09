import ExamHeader from "@/components/ExamHeader";
import PreExamTimer from "@/components/PreExamTimer";
import React from "react";
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
function PreExam() {
  return (
    <>
      {/* <ExamHeader /> */}
      <PreExamTimer />
    </>
  );
}

export default PreExam;
