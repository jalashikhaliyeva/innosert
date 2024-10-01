import React from "react";
import Container from "../Container";

function ReportImageSection({ servicesInfo }) {
  // console.log(servicesInfo, " report");

  return (
    <div
      className="bg-slate-600 mt-20"
      style={{
        backgroundImage: "url('/img/report.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div className="flex flex-col justify-center h-[600px]">
          <h1 className="font-gilroy text-5xl font-medium leading-lead55 text-grayBox w-1/2">
            {servicesInfo?.service?.title}
          </h1>
        </div>
      </Container>
    </div>
  );
}

export default ReportImageSection;
