import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import SuallarTable from "@/components/SuallarTable";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";
import { useContext } from "react";
import CompanyContext from "../shared/context/CompanyContext";

function ShirketHesabi() {
  const { selectedCompany } = useContext(CompanyContext);
  if (!selectedCompany) {
    // Handle the case where no company is selected
    return <div>Zəhmət olmasa, şirkət seçin.</div>;
  }
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
            <div>
              <h1 className="font-gilroy text-2xl">
                Shirket: {selectedCompany.name}
              </h1>
            </div>
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default ShirketHesabi;
