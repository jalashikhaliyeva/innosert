import Breadcrumb from "@/components/Breadcrumb";
import CardResult from "@/components/CardResult";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyProfiles from "@/components/MyProfiles";
import ProgressPieChart from "@/components/ProgressPieChart";
import Sidebar from "@/components/Sidebar";
import TitleNavigation from "@/components/TitleNavigation";
import React from "react";

function Neticelerim() {
  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block  md:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            <CardResult />
          </InternalContainer>
          
        </div>
       
      </div>

    </>
  );
}

export default Neticelerim;
