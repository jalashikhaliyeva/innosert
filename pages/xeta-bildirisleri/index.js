import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportTable from "@/components/ReportTable";
import ReportTitleNavigation from "@/components/ReportTitleNavigation";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";

function XetaBildirisleri() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { selectedCompany } = useContext(CompanyContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://innocert-admin.markup.az/api/report-question", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Company-ID": selectedCompany.id,
          },
        })
        .then((response) => {
          console.log("API response:", response.data.data);
          setReportData(response.data.data);
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    } else {
      console.error("No token found in local storage");
    }
  }, []);

  // Filter data based on the search term
  const filteredData = reportData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
            <ReportTitleNavigation setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm */}
            <ReportTable
              data={filteredData}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default XetaBildirisleri;
