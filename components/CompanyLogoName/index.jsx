import Image from "next/image";
import React from "react";

function CompanyLogoName() {
  return (

      <div className="pb-6">
        <div className="flex gap-2">
          <Image
            src="/img/handexLogo.png"
            alt="Handex Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h3 className="font-gilroy text-base text-grayText70">Handex</h3>
        </div>
       
      </div>
    
  );
}

export default CompanyLogoName;
