import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportSingleTable from "@/components/ReportSingleTable";
import ReportSingleNavigationTitle from "@/components/ReportSingleNavigationTitle";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import CompanyContext from "@/shared/context/CompanyContext";
import { useRouter } from "next/router";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import { UserContext } from "@/shared/context/UserContext";
import TeacherSidebar from "@/components/TeacherSidebar";
import Head from "next/head";
import { useTranslation } from "react-i18next";
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
function ReportsSingle() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { selectedCompany } = useContext(CompanyContext);
  const [reportData, setReportData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchReportData = async () => {
      if (id && selectedCompany) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            `https://innocert-admin.markup.az/api/report-question/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "X-Company-ID": selectedCompany.id,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data.data, "data single report");

            setReportData(data.data);
          } else {
            console.error("Failed to fetch report data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching report data:", error);
        }
      }
    };

    fetchReportData();
  }, [id, selectedCompany]);

  const filteredData = reportData
    ? reportData.filter(
        (item) =>
          (item.title &&
            item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.user &&
            item.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.type &&
            item.type.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <>
      <Head>
        <title>{t("navigation.reportedErrors")}</title>
      </Head>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block lg:hidden">
        {user?.data.roles === "Teacher" && <TeacherDashboardHeader />}
        {user?.data.roles === "Owner" && <OwnerDashboardHeader />}
      </div>
      <div className="flex">
        <div className="hidden lg:block lg:w-[20%]">
          {user?.data.roles === "Teacher" && <TeacherSidebar />}
          {user?.data.roles === "Owner" && <CompanySidebar />}
        </div>

        <div className="w-full lg:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <ReportSingleNavigationTitle
              reportData={reportData}
              setSearchTerm={setSearchTerm} // Pass setSearchTerm
            />
            <ReportSingleTable reportData={filteredData} />{" "}
            {/* Use filtered data */}
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default ReportsSingle;
