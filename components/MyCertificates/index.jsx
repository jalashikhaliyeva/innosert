import React from "react";
import { useRouter } from "next/router";
import MyCertificate from "../MyCertificate";

function MyCertificates({ certificates }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center w-full gap-5 mb-10">
      {certificates?.map((cert) => (
        <div
          key={cert.id}
          style={{ width: "350px", maxWidth: "100%" }}
          className="hover:cursor-pointer"
          // When the user clicks a certificate, navigate to /sertifikatlarim/{certificate_id}
          onClick={() => router.push(`/sertifikatlarim/${cert.certificate_id}`)}
        >
          <MyCertificate {...cert} />
        </div>
      ))}
    </div>
  );
}

export default MyCertificates;
