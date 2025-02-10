import Image from "next/image";
import React from "react";
import Certificate from "../Certificate";

function CertificateExampleAbout() {
  const certificateData = {
    username: "Qurbanov Elton",
    exam: "Microsoft Excel",
    date: "11 Dekabr 2024",
    seriya: "000000",
    percentage: 85,
  };
  return (
    <div style={{ width: "660px", maxWidth: "100%" }}>
    <Certificate {...certificateData} />
  </div>
  );
}

export default CertificateExampleAbout;
