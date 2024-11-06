import Image from "next/image";
import React from "react";

function CompanyLogoName({examData}) {
  
  return (

      <div className="pb-6">
        <div className="flex gap-2">
          <Image
            src={examData.exam.company_logo}
              
            alt="Handex Logo"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />
          <h3 className="font-gilroy flex items-center justify-center text-base text-grayText70">{examData.exam.company}</h3>
        </div>
       
      </div>
    
  );
}

export default CompanyLogoName;
