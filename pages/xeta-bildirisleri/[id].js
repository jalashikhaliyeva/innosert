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

  // 1) If there's no NextAuth session, not logged in => redirect to '/'
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 2) We do a server-side fetch to check if the user is verified
  //    Usually you'd pass the user's token from session.accessToken or similar.
  const userResponse = await fetch(
    "https://api.innosert.az/api/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`, // or wherever your token is
      },
    }
  );

  if (!userResponse.ok) {
    // If the fetch fails, treat it like "not verified"
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await userResponse.json();

  // 3) If user is unverified => redirect to '/', or /haqqimizda
  if (userData?.data?.sv === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 4) If everything's OK, let them proceed
  return {
    props: {
      // pass anything you want to the component
      userBalance: userData?.data?.balance || 0,
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
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchReportData = async () => {
      if (id && selectedCompany) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            `https://api.innosert.az/api/report-question/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "X-Company-ID": selectedCompany.id,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log(data.data, "data single report");

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
