import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyCertificates from "@/components/MyCertificates";
import MyProfiles from "@/components/MyProfiles";
import Sidebar from "@/components/Sidebar";
import TitleNavigation from "@/components/TitleNavigation";
import React from "react";

function Sertifikatlarim() {
  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block  md:w-[20%]">
          <Sidebar />
        </div>

        <div  className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            <MyCertificates />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Sertifikatlarim;
