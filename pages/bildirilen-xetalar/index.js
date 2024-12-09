// Teacher

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportTableTeacher from "@/components/ReportTableTeacher";
import ReportTitleNavigation from "@/components/ReportTitleNavigation";
import TeacherSidebar from "@/components/TeacherSidebar";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";

// Sample data
const reportData = [
  { id: 1, sualBasligi: "Sual 1", status: "Baxılıb", tarix: "2023-10-07" },
  { id: 2, sualBasligi: "Sual 2", status: "Baxılmayıb", tarix: "2023-10-06" },
  { id: 3, sualBasligi: "Sual 3", status: "Baxılıb", tarix: "2023-10-05" },
  { id: 4, sualBasligi: "Sual 4", status: "Baxılmayıb", tarix: "2023-10-04" },
  { id: 5, sualBasligi: "Sual 5", status: "Baxılıb", tarix: "2023-10-03" },
];

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

function BildirilenXetalar() {
  // Initialize state for selected rows
  const [selectedRows, setSelectedRows] = useState([]);

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
            <ReportTitleNavigation />
            <ReportTableTeacher
              data={reportData}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows} // Pass the state updater function
            />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default BildirilenXetalar;
