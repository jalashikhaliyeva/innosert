import Certificate from "@/components/Certificate";
import HeaderInternal from "@/components/HeaderInternal";
import React, { useState, useEffect, useContext, useCallback } from "react";

function Test() {
    const certificateData = {
        name: "Qurbanov Elton",
        course: "Microsoft Excel",
        date: "11 Dekabr 2024",
        certNumber: "000000",
        percentage: 85,
      };
  return (
    <>
      <div className="hidden lg:block">
        <HeaderInternal />
      </div>

      <Certificate {...certificateData} />

    </>
  );
}

export default Test;
