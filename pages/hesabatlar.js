import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import ReportsTable from "@/components/ReportsTable";
import ReportStatistics from "@/components/ReportStatistics";
import ReportTitleNavigationCalendar from "@/components/ReportTitleNavigationCalendar";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import SuallarTable from "@/components/SuallarTable";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";

function Hesabatlar() {
  return (
    <>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
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
