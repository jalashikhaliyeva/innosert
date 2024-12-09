import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportsTable from "@/components/ReportsTable";
import ReportStatistics from "@/components/ReportStatistics";
import ReportTitleNavigationCalendar from "@/components/ReportTitleNavigationCalendar";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import CompanyContext from "@/shared/context/CompanyContext";
import axios from "axios";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
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
function Hesabatlar() {
  const [reportData, setReportData] = useState(null);
  const { selectedCompany } = useContext(CompanyContext);
  const { t } = useTranslation();

  // New state for date filter
  const [dateFilter, setDateFilter] = useState({
    from: null, // Will hold Date objects
    to: null,
  });

  useEffect(() => {
    // Check if selectedCompany is available
    if (!selectedCompany) {
      console.warn("Selected company is not available.");
      return;
    }

    // Fetch the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Make the API call to fetch reports
      axios
        .get("https://innocert-admin.markup.az/api/me/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Company-ID": selectedCompany.id,
          },
        })
        .then((response) => {
          console.log(response.data.data, "response data report");
          setReportData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching reports:", error);
        });
    }
  }, [selectedCompany]); // Depend on selectedCompany instead of selectedCompany.id

  // Function to handle date filter changes
  const handleDateFilterChange = (newFilter) => {
    setDateFilter(newFilter);
  };

  // Function to filter report data based on dateFilter
  const getFilteredReportData = () => {
    if (!reportData || !reportData.history) return [];

    const { from, to } = dateFilter;

    return reportData.history.filter((item) => {
      if (!item.tarix) return false;

      const itemDate = new Date(item.tarix);

      // If both from and to are set
      if (from && to) {
        return itemDate >= from && itemDate <= to;
      }

      // If only from is set
      if (from) {
        return itemDate >= from;
      }

      // If only to is set
      if (to) {
        return itemDate <= to;
      }

      // If no filter is set, include all
      return true;
    });
  };

  const filteredReportData = getFilteredReportData();

  // Optional: Render a loading state if selectedCompany is not yet available
  if (!selectedCompany) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t("navigation.reports")}</title>
      </Head>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />

            {/* Pass the handler to ReportTitleNavigationCalendar */}
            <ReportTitleNavigationCalendar
              onFilterChange={handleDateFilterChange}
            />

            <ReportStatistics reportData={reportData} />

            {/* Pass the filtered data to ReportsTable */}
            <ReportsTable reportData={{ history: filteredReportData }} />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Hesabatlar;
