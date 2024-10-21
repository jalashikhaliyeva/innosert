import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyProfiles from "@/components/MyProfiles";
import Sidebar from "@/components/Sidebar";
import React from "react";

function Hesablarim() {
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
            <MyProfiles />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Hesablarim;
