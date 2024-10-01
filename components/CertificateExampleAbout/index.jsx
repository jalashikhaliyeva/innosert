import Image from "next/image";
import React from "react";

function CertificateExampleAbout() {
  return (
    <div className="flex">
      <Image
        src="/img/Certifcate.png"
        width={800}
        height={500}
        alt="Certificate"
        className="object-contain shadow-certificate"
      />
    </div>
  );
}

export default CertificateExampleAbout;
