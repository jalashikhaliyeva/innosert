import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyProfiles from "@/components/MyProfiles";
import Sidebar from "@/components/Sidebar";
import BalanceInfo from "@/components/BalanceInfo";
import BalanceTable from "@/components/BalanceTable";
import BalanceHistory from "@/components/BalanceHistory";
import React from "react";
import TitleNavigation from "@/components/TitleNavigation";

function Balansim() {
  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block  md:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            <BalanceInfo />
            {/* <BalanceHistory /> */}
            <BalanceTable />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Balansim;
