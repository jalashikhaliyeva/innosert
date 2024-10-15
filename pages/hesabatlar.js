import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportsTable from "@/components/ReportsTable";
import ReportStatistics from "@/components/ReportStatistics";
import ReportTitleNavigationCalendar from "@/components/ReportTitleNavigationCalendar";
import SuallarTable from "@/components/SuallarTable";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";

function Hesabatlar() {
  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <ReportTitleNavigationCalendar />
            <ReportStatistics />
            <ReportsTable />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Hesabatlar;
