import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import SuallarTable from "@/components/SuallarTable";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";

function Uzvler() {
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
            <h1>Uzvler</h1>
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Uzvler;
